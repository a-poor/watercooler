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
    pub name: String,
}


#[tauri::command]
pub fn list_chats(state: tauri::State<'_, AppState>) -> Result<Vec<Chat>, String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };

    // Get the chats...
    let conn = conn.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, name FROM chats").unwrap();
    let chats = stmt.query_map([], |row| {
        Ok(Chat {
            id: row.get(0)?,
            name: row.get(1)?,
        })
    }).unwrap();

    // Return the chats...
    Ok(chats.collect::<rusqlite::Result<Vec<Chat>>>().unwrap())
}

#[tauri::command]
pub fn add_chat(state: tauri::State<'_, AppState>, name: String) -> Result<i64, String> {
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

#[tauri::command]
pub fn delete_chat(state: tauri::State<'_, AppState>, id: i64) -> Result<(), String> {
    // Get the database connection...
    let conn = match &state.db_conn {
        Some(c) => c,
        None => return Err("Failed to get database connection".into()),
    };

    // Delete the chat...
    let conn = conn.lock().unwrap();
    conn.execute("DELETE FROM chats WHERE id = ?", [id]).unwrap();

    // Return success...
    Ok(())
}


