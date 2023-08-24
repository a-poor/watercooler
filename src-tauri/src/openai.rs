//! Handles connections to the OpenAI API.

/// The default base URL for the OpenAI API.
pub const DEFAULT_API_BASE_URL: &str = "https://api.openai.com";

/// The API path to create a new chat completion.
pub const ENDPOINT_CREATE_CHAT_COMPLETION: &str = "/v1/chat/completions";

// /// The API path to create a new audio transcription.
// pub const ENDPOINT_CREATE_TRANSCRIPTION: &str = "/v1/audio/transcriptions";



pub struct ChatCompletionRequest {
    pub model: String,
    pub messages: Vec<ChatMessage>,
    pub functions: Option<Vec<FunctionCall>>,
}

pub struct ChatMessage {

}

pub struct ChatCompletionResponse {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: String,
    pub choices: Vec<ChatCompletionChoice>,
}

pub struct ChatCompletionChoice {
    pub index: i64,
    pub message: ChatCompletionMessage,
    pub finish_reason: Option<String>,
}

pub struct ChatCompletionMessage {
    pub role: String,
    pub content: Option<String>,
    pub function_call: Option<FunctionCall>,

}

pub struct FunctionCall {
    pub name: String,
    pub arguments: String,
}

pub struct ChatCompletionUsage {
    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub total_tokens: i64,
}

pub struct ChatCompletionChunkResponse {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: String,
    pub choices: Vec<ChatCompletionChunkChoice>,
}

pub struct ChatCompletionChunkChoice {
    pub index: i64,
    pub delta: ChatCompletionChunkMessage,
    pub finish_reason: Option<String>,
}

pub struct ChatCompletionChunkMessage {
    pub role: String,
    pub content: Option<String>,
    pub function_call: Option<FunctionCall>,   
}

