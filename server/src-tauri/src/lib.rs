mod osc;

use std::{net::SocketAddr, sync::Mutex};

use axum::{
    body::Body,
    extract::{State as AxumState},
    http::{Request, Response, StatusCode},
    middleware::from_fn,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use rosc::OscType;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter, State};
use tower_http::services::{ServeDir, ServeFile};

use crate::osc::Osc;

struct OscState(pub Mutex<Option<Osc>>);

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

#[tauri::command]
fn osc_connect(address: String, port: u16, state: State<OscState>) -> Result<(), String> {
    let address_clone = address.clone();
    let osc = Osc::new(address, port);
    osc.connect()
        .map_err(|e| format!("Failed to connect to OSC server: {}", e))?;
    println!("Connected to OSC server at {}:{}", address_clone, port);

    *state.0.lock().unwrap() = Some(osc);

    Ok(())
}

#[tauri::command]
fn osc_disconnect(state: State<OscState>) -> Result<(), String> {
    let mut osc_state = state.0.lock().unwrap();
    if let Some(osc) = osc_state.take() {
        println!(
            "Disconnected from OSC server at {}:{}",
            osc.get_address(),
            osc.get_port()
        );
        Ok(())
    } else {
        Err("No OSC connection to disconnect".to_string())
    }
}

#[tauri::command]
fn osc_send_chatbox(text: String, state: State<OscState>) -> Result<(), String> {
    let mut osc_state = state.0.lock().unwrap();
    if let Some(osc) = osc_state.as_mut() {
        send_chatbox(text, osc);
        Ok(())
    } else {
        Err("OSC connection not established".to_string())
    }
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
    match state.app_handle.emit("chatbox", &payload) {
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
        .body(Body::from(r#"{"message": "Hello, API!"}"#))
        .unwrap()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle().clone();
            let serve_dir = ServeDir::new("../web/out")
                .not_found_service(ServeFile::new("../web/out/404.html"));

            tauri::async_runtime::spawn(async move {
                let app = Router::new()
                    .route("/api", get(api_root))
                    .route("/api/chatbox", post(api_chatbox))
                    .with_state(AppState { app_handle: app_handle })
                    .fallback_service(
                        axum::routing::get_service(serve_dir).layer(from_fn(on_request)),
                    );
                let addr = SocketAddr::from(([0, 0, 0, 0], 11087));

                let listener = match tokio::net::TcpListener::bind(addr).await {
                    Ok(l) => l,
                    Err(e) => {
                        eprintln!("Failed to bind to address {}: {}", addr, e);
                        std::process::exit(1);
                    }
                };

                println!("Server running at http://{}", addr);

                axum::serve(listener, app)
                    .await
                    .map_err(|e| {
                        eprintln!("Server error: {}", e);
                        std::process::exit(1);
                    })
                    .unwrap();
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .manage(OscState(Mutex::new(None)))
        .invoke_handler(tauri::generate_handler![
            osc_connect,
            osc_disconnect,
            osc_send_chatbox,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
