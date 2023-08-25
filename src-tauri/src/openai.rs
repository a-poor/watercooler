//! Handles connections to the OpenAI API.

use serde::{Serialize, Deserialize};

/// The default base URL for the OpenAI API.
pub const DEFAULT_API_BASE_URL: &str = "https://api.openai.com";

/// The API path to create a new chat completion.
pub const ENDPOINT_CREATE_CHAT_COMPLETION: &str = "/v1/chat/completions";

// /// The API path to create a new audio transcription.
// pub const ENDPOINT_CREATE_TRANSCRIPTION: &str = "/v1/audio/transcriptions";


#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionRequest {
    pub model: String,
    pub messages: Vec<ChatMessage>,
    pub functions: Option<Vec<FunctionCall>>,
    pub function_call: Option<FunctionCallType>,
    pub temperature: Option<f64>,
    pub top_p: Option<f64>,
    pub n: Option<u32>,
    pub stream: Option<bool>,
    /// Note: Officially, this could be either a sring, an array of
    /// strings, or null. However, for simplicity, I'm just going to
    /// use either an array of strings (which could have only a 
    /// stop-sequence string) or null.
    pub stop: Option<Vec<String>>,
    pub max_tokens: Option<u64>,
    pub presence_penalty: Option<f64>,
    pub frequency_penalty: Option<f64>,
    // pub logit_bias: Option<serde_json::Value>,
    pub user: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionResponse {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: String,
    pub choices: Vec<ChatCompletionChoice>,
    pub usage: ChatCompletionUsage,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatMessage {
    pub role: String,
    pub content: Option<String>,
    pub name: Option<String>,
    pub function_call: Option<FunctionCall>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Function {
    pub name: String,
    pub description: Option<String>,
    pub parameters: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum FunctionCallType {
    #[serde(rename = "none")]
    None,
    #[serde(rename = "auto")]
    Auto,
    #[serde(rename = "name")]
    Name(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionChoice {
    pub index: i64,
    pub message: ChatCompletionMessage,
    pub finish_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionMessage {
    pub role: String,
    pub content: Option<String>,
    pub function_call: Option<FunctionCall>,

}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FunctionCall {
    pub name: String,
    pub arguments: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionUsage {
    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub total_tokens: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionChunkResponse {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: String,
    pub choices: Vec<ChatCompletionChunkChoice>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionChunkChoice {
    pub index: i64,
    pub delta: ChatCompletionChunkMessage,
    pub finish_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatCompletionChunkMessage {
    pub role: String,
    pub content: Option<String>,
    pub function_call: Option<FunctionCall>,   
}

