// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#![allow(unused_imports)]

use std::fs::create_dir_all;
use std::sync::Mutex;
use rusqlite::Connection;
use anyhow::{Result, anyhow};
use tauri::api::path::{app_config_dir, app_data_dir};

mod settings;
mod api;
mod old_storage;
mod openai;
mod migrate;
mod chat;


fn main() -> Result<()> {
    // Get the context...
    let ctx = tauri::generate_context!();

    // Get the config dir and the data dir...
    let config_file_path = match app_config_dir(ctx.config()) {
        Some(mut p) => {
            // Create the directory if it doesn't exist...
            create_dir_all(&p).expect("Failed to create config dir");

            // Add the filename and return...
            p.push("watercooler-config.json");
            Some(p.to_string_lossy().to_string())
        },
        None => None,
    };
    let data_db_path = match app_data_dir(ctx.config()) {
        Some(mut p) => {
            // Create the directory if it doesn't exist...
            create_dir_all(&p).expect("Failed to create config dir");

            // Add the filename and return...
            p.push("watercooler-data.db");
            Some(p.to_string_lossy().to_string())
        },
        None => None,
    };

    // Get the database connection...
    let db_conn = match data_db_path {
        Some(ref p) => {
            // Get the connection...
            let c = Connection::open(p)
                .map_err(|err| anyhow!("Failed to open database: {}", err))?;

            // Run the migration...
            migrate::run_migrations(&c)
                .map_err(|err| anyhow!("Failed to migrate database: {}", err))?;

            // Return the connection...
            Some(Mutex::new(c))
        },
        None => {
            println!("Failed to get data dir");
            None
        },
    };

    // Build and run the app...
    tauri::Builder::default()
        .manage(settings::AppState {
            config_file_path,
            data_db_path,
            db_conn,
        })
        .invoke_handler(tauri::generate_handler![
            settings::get_settings,
            settings::get_default_settings,
            settings::set_settings,
            api::send_chat_request,
            old_storage::list_chats,
            old_storage::add_chat,
            old_storage::rename_chat,
            old_storage::delete_chat,
            old_storage::get_messages,
            old_storage::add_message,
            old_storage::delete_message,
        ])
        .run(ctx)
        .expect("error while running tauri application");

    Ok(())
}
