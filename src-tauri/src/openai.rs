//! Handles connections to the OpenAI API.

use url::Url;
use anyhow::{anyhow, Result};
use serde::{Serialize, Deserialize};

/// The default base URL for the OpenAI API.
const DEFAULT_API_BASE_URL: &str = "https://api.openai.com";

/// The API path to create a new chat completion.
const ENDPOINT_CREATE_CHAT_COMPLETION: &str = "/v1/chat/completions";

/// The API path to create a new audio transcription.
const ENDPOINT_CREATE_TRANSCRIPTION: &str = "/v1/audio/transcriptions";


async fn stream_chat_request(host: &str, token: &str, req: ChatCompletionRequest) -> Result<ChatCompletionChunkResponse> {
    // Ensure that stream is set...
    // (This probably isn't the best approach, but it works for now)
    let mut req = req.clone();
    req.stream = Some(true);

    // Format the url...
    let url = Url::parse(host)?;
    let url = url.join(ENDPOINT_CREATE_CHAT_COMPLETION)?;

    // Format the request...
    let res = reqwest::Client::new()
        .post(url)
        .json(&req)
        .bearer_auth(token)
        .send()
        .await?;

    // Check the status code...
    // TODO - See `res.error_for_status()`?
    if !res.status().is_success() {
        return Err(anyhow!("Failed to create chat completion: {}", res.status()));
    }

    // Otherwise, stream the response...
    

    todo!();
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionRequest {
    model: String,
    messages: Vec<ChatMessage>,
    functions: Option<Vec<FunctionCall>>,
    function_call: Option<FunctionCallType>,
    temperature: Option<f64>,
    top_p: Option<f64>,
    n: Option<u32>,
    stream: Option<bool>,
    /// Note: Officially, this could be either a sring, an array of
    /// strings, or null. However, for simplicity, I'm just going to
    /// use either an array of strings (which could have only a 
    /// stop-sequence string) or null.
    stop: Option<Vec<String>>,
    max_tokens: Option<u64>,
    presence_penalty: Option<f64>,
    frequency_penalty: Option<f64>,
    // logit_bias: Option<serde_json::Value>,
    user: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionResponse {
    id: String,
    object: String,
    created: i64,
    model: String,
    choices: Vec<ChatCompletionChoice>,
    usage: ChatCompletionUsage,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionChunkResponse {
    id: String,
    object: String,
    created: i64,
    model: String,
    choices: Vec<ChatCompletionChunkChoice>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatMessage {
    role: String,
    content: Option<String>,
    name: Option<String>,
    function_call: Option<FunctionCall>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Function {
    name: String,
    description: Option<String>,
    parameters: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum FunctionCallType {
    #[serde(rename = "none")]
    None,
    #[serde(rename = "auto")]
    Auto,
    #[serde(rename = "name")]
    Name(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionChoice {
    index: i64,
    message: ChatCompletionMessage,
    finish_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionMessage {
    role: String,
    content: Option<String>,
    function_call: Option<FunctionCall>,

}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct FunctionCall {
    name: String,
    arguments: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionUsage {
    prompt_tokens: i64,
    completion_tokens: i64,
    total_tokens: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionChunkChoice {
    index: i64,
    delta: ChatCompletionChunkMessage,
    finish_reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatCompletionChunkMessage {
    role: String,
    content: Option<String>,
    function_call: Option<FunctionCall>,   
}

