// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::path::{app_config_dir, app_data_dir};
mod settings;
mod api;
mod storage;


fn main() {
    // Get the context...
    let ctx = tauri::generate_context!();

    // Get the config dir and the data dir...
    let config_dir = match app_config_dir(ctx.config()) {
        Some(mut p) => {
            p.push("watercooler-config.json");
            Some(p.to_string_lossy().to_string())
        },
        None => None,
    };
    let data_dir = match app_data_dir(ctx.config()) {
        Some(mut p) => {
            p.push("watercooler-data.db");
            Some(p.to_string_lossy().to_string())
        },
        None => None,
    };

    // Create the app state...
    let state = settings::AppState {
        config_dir,
        data_dir,
    };

    // Build and run the app...
    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            settings::get_settings,
            settings::get_default_settings,
            settings::set_settings,
            api::send_chat_request,
        ])
        .run(ctx)
        .expect("error while running tauri application");
}
