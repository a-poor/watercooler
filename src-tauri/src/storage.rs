use serde::{Serialize, Deserialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct Chat {
    pub id: i64,
    pub name: String,
}


#[derive(Debug, Serialize, Deserialize)]
pub struct ChatMessage {
    pub id: i64,
    pub chat_id: i64,
    pub role: String,
    pub content: String,
    pub name: String,
}

