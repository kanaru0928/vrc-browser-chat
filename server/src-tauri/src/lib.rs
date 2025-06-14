use std::net::SocketAddr;

use axum::{
    body::Body,
    http::{Request, Response, StatusCode},
    middleware::from_fn,
    response::{IntoResponse},
    routing::get,
    Router,
};
use tower_http::services::{ServeDir, ServeFile};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 追加: リクエスト時に実行する関数
async fn on_request(req: Request<Body>, next: axum::middleware::Next) -> impl IntoResponse {
    // ここで任意の処理（例: ログ出力）
    println!("request: {}", req.uri());
    // 必要なら他の処理も
    next.run(req).await
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
                    .fallback_service(
                        axum::routing::get_service(serve_dir).layer(from_fn(on_request)),
                    )
                    .with_state(app_handle);
                let addr = SocketAddr::from(([127, 0, 0, 1], 11087));

                let listener = tokio::net::TcpListener::bind(addr)
                    .await
                    .expect("Failed to bind to address");

                println!("Server running at http://{}", addr);

                axum::serve(listener, app)
                    .await
                    .expect("Failed to start server");
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
