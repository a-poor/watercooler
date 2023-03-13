use std::sync::Mutex;
use rusqlite::Connection;
use serde::{Serialize, Deserialize};
use crate::settings::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct Chat {
    pub id: i64,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatMessage {
    pub id: i64,
    #[serde(rename = "chatId")]
    pub chat_id: i64,
    pub role: String,
    pub content: String,
}


#[tauri::command]
pub fn list_chats(state: tauri::State<'_, AppState>) -> Result<Vec<Chat>, String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };

    // Get the chats...
    let conn = match conn.lock() {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };
    let mut stmt = match conn.prepare("SELECT id, name FROM chats") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    let chats = stmt.query_map([], |row| {
        Ok(Chat {
            id: row.get(0)?,
            name: row.get(1)?,
        })
    });
    let chats = match chats {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };

    // Return the chats...
    let mut res = Vec::new();
    for chat in chats {
        match chat {
            Ok(c) => res.push(c),
            Err(e) => return Err(e.to_string()),
        }
    }
    Ok(res)
}

#[tauri::command]
pub fn add_chat(state: tauri::State<'_, AppState>, name: Option<String>) -> Result<i64, String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };

    let conn = match conn.lock() {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };

    // Get the next chat ID (current max + 1)...
    let mut stmt = match conn.prepare("SELECT MAX(id) FROM chats;") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };

    let id = match stmt.query_row([], |row| {
        match row.get::<_, i64>(0) {
            Ok(i) => Ok(i + 1),
            Err(_) => Ok(1),
        }
    }) {
        Ok(i) => i,
        Err(e) => return Err(e.to_string()),
    };


    // Add the chat...
    match conn.execute("INSERT INTO chats (id, name) VALUES (id, ?);", (id, name)) {
        Ok(_) => (),
        Err(e) => return Err(e.to_string()),
    };

    // Return success...
    Ok(id)
}

// TODO - Add function to rename chat...

#[tauri::command]
pub fn delete_chat(state: tauri::State<'_, AppState>, id: i64) -> Result<(), String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };

    // Delete the messages...
    let conn = match conn.lock() {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };
    let mut stmt = match conn.prepare("DELETE FROM chat_messages WHERE chat_id = ?;") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    match stmt.execute([id]) {
        Ok(_) => (),
        Err(e) => return Err(e.to_string()),
    };
    
    // Delete the chat...
    let mut stmt = match conn.prepare("DELETE FROM chats WHERE id = ?;") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    match stmt.execute([id]) {
        Ok(_) => (),
        Err(e) => return Err(e.to_string()),
    };

    // Return success...
    Ok(())
}

pub fn _get_messages(db_conn: &Mutex<Connection>, chat_id: i64) -> Result<Vec<ChatMessage>, String> {
    // Get the messages...
    let conn = match db_conn.lock() {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };
    let mut stmt = match conn.prepare("SELECT id, chat_id, role, content FROM chat_messages WHERE chat_id = ?;") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    let messages = stmt.query_map([chat_id], |row| {
        Ok(ChatMessage {
            id: row.get(0)?,
            chat_id: row.get(1)?,
            role: row.get(2)?,
            content: row.get(3)?,
        })
    });
    let messages = match messages {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };

    // Return the messages...
    let mut res = Vec::new();
    for message in messages {
        match message {
            Ok(c) => res.push(c),
            Err(e) => return Err(e.to_string()),
        }
    }
    Ok(res)
}

#[tauri::command]
pub fn get_messages(state: tauri::State<'_, AppState>, chat_id: i64) -> Result<Vec<ChatMessage>, String> {
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };
    _get_messages(conn, chat_id)
}

pub fn _add_message(conn: &Mutex<Connection>, chat_id: i64, role: String, content: String) -> Result<i64, String> {
    // Get the database connection...
    let conn = match conn.lock() {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };

    // Get the next message ID (current max + 1)...
    let mut stmt = match conn.prepare("SELECT MAX(id) FROM chat_messages WHERE chat_id = ?;") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };

    let id = match stmt.query_row([chat_id], |row| {
        match row.get::<_, i64>(0) {
            Ok(i) => Ok(i + 1),
            Err(_) => Ok(1),
        }
    }) {
        Ok(i) => i,
        Err(e) => return Err(e.to_string()),
    };

    // Insert the message...
    let mut stmt = match conn.prepare("INSERT INTO chat_messages (id, chat_id, role, content) VALUES (?, ?, ?, ?);") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    match stmt.execute((id, chat_id, role, content)) {
        Ok(_) => (),
        Err(e) => return Err(e.to_string()),
    };

    Ok(id)
}

#[tauri::command]
pub fn add_message(state: tauri::State<'_, AppState>, chat_id: i64, role: String, content: String) -> Result<i64, String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };
    _add_message(conn, chat_id, role, content) // TODO - Return all messages instead of just the latest ID...
}

#[tauri::command]
pub fn delete_message(state: tauri::State<'_, AppState>, chat_id: i64, id: i64) -> Result<(), String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };

    // Delete the message...
    let conn = match conn.lock() {
        Ok(c) => c,
        Err(e) => return Err(e.to_string()),
    };
    let mut stmt = match conn.prepare("DELETE FROM chat_messages WHERE chat_id = ? AND id = ?;") {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };
    match stmt.execute((chat_id, id)) {
        Ok(_) => (),
        Err(e) => return Err(e.to_string()),
    };

    // Return success...
    Ok(())
}


