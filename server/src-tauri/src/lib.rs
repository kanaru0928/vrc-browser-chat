mod osc;

use std::{
    net::SocketAddr,
    sync::{Arc, Mutex},
};

use axum::{
    body::Body,
    extract::State as AxumState,
    http::{Request, Response, StatusCode},
    middleware::from_fn,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use local_ip_address::local_ip;
use rosc::OscType;
use serde::{Deserialize, Serialize};
use tauri::{path::BaseDirectory, AppHandle, Emitter, Manager, State};
use tauri_plugin_updater::UpdaterExt;
use tokio::sync::oneshot;
use tower_http::services::{ServeDir, ServeFile};

use crate::osc::Osc;

struct OscState(pub Mutex<Option<Osc>>);

struct ServerManager {
    is_running: Arc<Mutex<bool>>,
    shutdown_sender: Arc<Mutex<Option<oneshot::Sender<()>>>>,
    url: Arc<Mutex<Option<String>>>,
    port: Arc<Mutex<u16>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ApiChatboxPost {
    text: String,
}

#[derive(Clone)]
struct AppState {
    app_handle: AppHandle,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ApiResponse {
    success: bool,
    message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct OscUpdatedEvent {
    status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ServerStatusUpdatedEvent {
    url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ServerErrorEvent {
    error: String,
}

#[tauri::command]
fn osc_connect(
    address: String,
    port: u16,
    state: State<OscState>,
    app_handler: AppHandle,
) -> Result<(), String> {
    let address_clone = address.clone();
    let osc = Osc::new(address, port);
    match osc.connect() {
        Ok(_) => {
            println!("Connected to OSC server at {}:{}", address_clone, port);
            *state.0.lock().unwrap() = Some(osc);
            app_handler
                .emit(
                    "osc-updated",
                    OscUpdatedEvent {
                        status: "Connected".into(),
                    },
                )
                .unwrap();
            Ok(())
        }
        Err(e) => {
            eprintln!("Failed to connect to OSC server: {}", e);
            app_handler
                .emit(
                    "osc-updated",
                    OscUpdatedEvent {
                        status: "Disconnected".into(),
                    },
                )
                .unwrap();
            Err(format!("Failed to connect to OSC server: {}", e))
        }
    }
}

#[tauri::command]
fn osc_disconnect(state: State<OscState>, app_handler: AppHandle) -> Result<(), String> {
    let mut osc_state = state.0.lock().unwrap();
    if let Some(osc) = osc_state.take() {
        println!(
            "Disconnected from OSC server at {}:{}",
            osc.get_address(),
            osc.get_port()
        );
        app_handler
            .emit(
                "osc-updated",
                OscUpdatedEvent {
                    status: "Disconnected".into(),
                },
            )
            .unwrap();
        Ok(())
    } else {
        Err("No OSC connection to disconnect".to_string())
    }
}

#[tauri::command]
fn osc_send_chatbox(text: String, state: State<OscState>) -> Result<(), String> {
    println!("Sending chatbox message: {}", text);
    
    let mut osc_state = state.0.lock().unwrap();
    if let Some(osc) = osc_state.as_mut() {
        send_chatbox(text, osc);
        Ok(())
    } else {
        Err("OSC connection not established".to_string())
    }
}

#[tauri::command]
async fn web_start_server(
    port: u16,
    server_manager: State<'_, ServerManager>,
    app_handler: AppHandle,
) -> Result<ServerStatusUpdatedEvent, String> {
    let mut is_running = server_manager.is_running.lock().unwrap();

    if *is_running {
        println!("Web server is already running");
        return Ok(ServerStatusUpdatedEvent {
            url: server_manager
                .url
                .lock()
                .unwrap()
                .clone()
                .unwrap_or_default(),
        });
    }

    *is_running = true;
    *server_manager.port.lock().unwrap() = port;
    drop(is_running);

    let (shutdown_sender, shutdown_receiver) = oneshot::channel();
    *server_manager.shutdown_sender.lock().unwrap() = Some(shutdown_sender);

    let app_handler_clone = app_handler.clone();
    let server_manager_clone = Arc::new(ServerManager {
        is_running: server_manager.is_running.clone(),
        shutdown_sender: server_manager.shutdown_sender.clone(),
        url: server_manager.url.clone(),
        port: server_manager.port.clone(),
    });

    tauri::async_runtime::spawn(async move {
        let _ = start_server(app_handler_clone, shutdown_receiver, server_manager_clone).await;
    });

    match local_ip() {
        Ok(ip) => {
            let url = format!("http://{}:{}", ip, port);
            *server_manager.url.lock().unwrap() = Some(url.clone());
            Ok(ServerStatusUpdatedEvent { url })
        }
        Err(e) => {
            *server_manager.is_running.lock().unwrap() = false;
            Err(format!("Failed to get local IP address: {}", e))
        }
    }
}

async fn stop_server(app_handler: AppHandle, server_manager: &ServerManager) -> Result<(), String> {
    let mut is_running = server_manager.is_running.lock().unwrap();

    if !*is_running {
        return Err("Server is not running".to_string());
    }

    if let Some(sender) = server_manager.shutdown_sender.lock().unwrap().take() {
        if sender.send(()).is_ok() {
            *is_running = false;
            *server_manager.url.lock().unwrap() = None;

            if let Err(e) = app_handler.emit(
                "server-status-updated",
                ServerStatusUpdatedEvent {
                    url: server_manager
                        .url
                        .lock()
                        .unwrap()
                        .clone()
                        .unwrap_or_default(),
                },
            ) {
                eprintln!("Failed to emit server status updated event: {}", e);
            }

            Ok(())
        } else {
            Err("Failed to send shutdown signal".to_string())
        }
    } else {
        Err("No shutdown sender available".to_string())
    }
}

#[tauri::command]
async fn web_stop_server(
    app_handler: AppHandle,
    server_manager: State<'_, ServerManager>,
) -> Result<(), String> {
    stop_server(app_handler, &server_manager).await
}

#[tauri::command]
async fn check_for_updates(app: AppHandle) -> Result<bool, String> {
    match app.updater() {
        Ok(updater) => {
            match updater.check().await {
                Ok(Some(update)) => {
                    println!("Update available: {}", update.version);
                    Ok(true)
                }
                Ok(None) => {
                    println!("No update available");
                    Ok(false)
                }
                Err(e) => {
                    eprintln!("Failed to check for updates: {}", e);
                    Err(format!("Failed to check for updates: {}", e))
                }
            }
        }
        Err(e) => {
            eprintln!("Failed to get updater: {}", e);
            Err(format!("Failed to get updater: {}", e))
        }
    }
}

#[tauri::command]
async fn install_update(app: AppHandle) -> Result<(), String> {
    match app.updater() {
        Ok(updater) => {
            match updater.check().await {
                Ok(Some(update)) => {
                    println!("Installing update: {}", update.version);
                    match update.download_and_install(|chunk_length, content_length| {
                        println!("Downloaded {} of {:?} bytes", chunk_length, content_length);
                    }, || {
                        println!("Download finished");
                    }).await {
                        Ok(_) => {
                            println!("Update installed successfully");
                            Ok(())
                        }
                        Err(e) => {
                            eprintln!("Failed to install update: {}", e);
                            Err(format!("Failed to install update: {}", e))
                        }
                    }
                }
                Ok(None) => Err("No update available".to_string()),
                Err(e) => {
                    eprintln!("Failed to check for updates: {}", e);
                    Err(format!("Failed to check for updates: {}", e))
                }
            }
        }
        Err(e) => {
            eprintln!("Failed to get updater: {}", e);
            Err(format!("Failed to get updater: {}", e))
        }
    }
}

async fn start_server(
    app_handler: AppHandle,
    shutdown_receiver: oneshot::Receiver<()>,
    server_manager: Arc<ServerManager>,
) -> Result<(), String> {
    let port = *server_manager.port.lock().unwrap();
    let base_path = app_handler
        .path()
        .resolve("_up_/_up_", BaseDirectory::Resource)
        .unwrap();
    let serve_dir = ServeDir::new(base_path.join("web/out"))
        .not_found_service(ServeFile::new(base_path.join("web/out/index.html")));

    let app = Router::new()
        .route("/api", get(api_root))
        .route("/api/chatbox", post(api_chatbox))
        .with_state(AppState {
            app_handle: app_handler.clone(),
        })
        .fallback_service(axum::routing::get_service(serve_dir).layer(from_fn(on_request)));
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    let listener = match tokio::net::TcpListener::bind(addr).await {
        Ok(l) => l,
        Err(e) => {
            eprintln!("Failed to bind to address {}: {}", addr, e);
            app_handler
                .emit(
                    "server-error",
                    ServerErrorEvent {
                        error: e.to_string(),
                    },
                )
                .unwrap();
            return Err(format!("Failed to bind to address {}: {}", addr, e));
        }
    };

    match local_ip() {
        Ok(ip) => {
            let url = format!("http://{}:{}", ip, port);
            let url_for_print = url.clone();
            if let Err(e) =
                app_handler.emit("server-status-updated", ServerStatusUpdatedEvent { url })
            {
                eprintln!("Failed to emit server status update: {}", e);
            }
            println!("Server URL: {}", url_for_print);
        }
        Err(e) => {
            eprintln!("Failed to get local IP address: {}", e);
            return Err(format!("Failed to get local IP address: {}", e));
        }
    }

    axum::serve(listener, app)
        .with_graceful_shutdown(async {
            shutdown_receiver.await.ok();
        })
        .await
        .map_err(|e| {
            eprintln!("Server error: {}", e);
        })
        .unwrap_or(());

    *server_manager.is_running.lock().unwrap() = false;
    *server_manager.url.lock().unwrap() = None;
    println!("Web server stopped");

    Ok(())
}

fn send_chatbox(text: String, osc: &Osc) {
    let text_clone = text.clone();
    osc.send_message(
        "/chatbox/input".to_string(),
        vec![OscType::String(text), OscType::Bool(true)],
    );
    println!("Sent OSC message to chatbox: {}", text_clone);
}

async fn on_request(req: Request<Body>, next: axum::middleware::Next) -> impl IntoResponse {
    println!("request: {}", req.uri());
    next.run(req).await
}

async fn api_chatbox(
    AxumState(state): AxumState<AppState>,
    Json(payload): Json<ApiChatboxPost>,
) -> Result<Json<ApiResponse>, StatusCode> {
    println!("Received message: {:?}", payload);

    // Tauriアプリにメッセージを送信
    match state.app_handle.emit("chatbox-updated", &payload) {
        Ok(_) => {
            println!("Message sent to Tauri app successfully");
            Ok(Json(ApiResponse {
                success: true,
                message: "Message received and sent to app".to_string(),
            }))
        }
        Err(e) => {
            eprintln!("Failed to send message to Tauri app: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn api_root() -> impl IntoResponse {
    let builder = Response::builder();
    builder
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::from(r#"{"status": "OK"}"#))
        .unwrap()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .manage(OscState(Mutex::new(None)))
        .manage(ServerManager {
            is_running: Arc::new(Mutex::new(false)),
            shutdown_sender: Arc::new(Mutex::new(None)),
            url: Arc::new(Mutex::new(None)),
            port: Arc::new(Mutex::new(11087)),
        })
        .invoke_handler(tauri::generate_handler![
            osc_connect,
            osc_disconnect,
            osc_send_chatbox,
            web_start_server,
            web_stop_server,
            check_for_updates,
            install_update
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
