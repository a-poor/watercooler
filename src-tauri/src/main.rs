// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#![allow(unused_imports)]

use std::sync::Mutex;
use rusqlite::Connection;
use tauri::api::path::{app_config_dir, app_data_dir};
mod settings;
mod api;
mod storage;


fn main() {
    // Get the context...
    let ctx = tauri::generate_context!();

    // Get the config dir and the data dir...
    // let config_file_path = match app_config_dir(ctx.config()) {
    //     Some(mut p) => {
    //         p.push("watercooler-config.json");
    //         Some(p.to_string_lossy().to_string())
    //     },
    //     None => None,
    // };
    // let data_db_path = match app_data_dir(ctx.config()) {
    //     Some(mut p) => {
    //         p.push("watercooler-data.db");
    //         Some(p.to_string_lossy().to_string())
    //     },
    //     None => None,
    // };

    // TODO - Replace this with the above...
    let config_file_path = Some("/Users/austinpoor/Downloads/watercooler-config.json".into());
    let data_db_path = Some("/Users/austinpoor/Downloads/watercooler-data.db".into());

    // Get the database connection...
    let db_conn = match data_db_path {
        Some(ref p) => {
            let c = Connection::open(p);
            match c {
                Ok(c) => {
                    // Create the tables if they don't exist...
                    let s = "CREATE TABLE IF NOT EXISTS chats (
                        id INT,
                        name TEXT
                    );";
                    match c.execute(s, []) {
                        Ok(_) => {},
                        Err(err) => {
                            println!("Failed to create chats table: {}", err);
                        },
                    };
                    let s = "CREATE TABLE IF NOT EXISTS chat_messages (
                        id INT,
                        chat_id INT,
                        role TEXT,
                        content TEXT
                    );";
                    match c.execute(s, []) {
                        Ok(_) => {},
                        Err(err) => {
                            println!("Failed to create chats table: {}", err);
                        },
                    };

                    // Return the connection...
                    Some(Mutex::new(c))
                },
                Err(err) => {
                    println!("Failed to open database: {}", err);
                    None
                },
            }
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
            storage::list_chats,
            storage::add_chat,
            storage::delete_chat,
            storage::get_messages,
            storage::add_message,
            storage::delete_message,
        ])
        .run(ctx)
        .expect("error while running tauri application");
}
