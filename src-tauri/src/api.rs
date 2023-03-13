use anyhow::anyhow;
use serde::{Serialize, Deserialize};
use tauri::async_runtime::Mutex;
use crate::settings::{AppState, _get_settings};


const CHAT_COMPLETION_PATH: &str = "/v1/chat/completions";


fn format_url(host: String) -> anyhow::Result<String> {
    let u = match url::Url::parse(host.as_str()) {
        Ok(u) => u,
        Err(_) => return Err(anyhow!("Failed to parse host")),
    };
    match u.join(CHAT_COMPLETION_PATH) {
        Ok(u) => Ok(u.to_string()),
        Err(_) => Err(anyhow!("Failed to join host and path")),
    }
}


#[derive(Debug, Clone, Serialize, Deserialize)]
struct CreateChatCompletionRequest {
    model: String,
    messages: Vec<ChatMessageEntry>,
}


#[derive(Debug, Clone, Serialize, Deserialize)]
struct ChatMessageEntry {
    role: String,
    content: String,
}


#[derive(Debug, Clone, Serialize, Deserialize)]
struct CreateChatCompletionResponse {
    id: String,
    object: String,
    created: i64,
    model: String,
    choices: Vec<CompletionChoice>,
    usage: CompletionUsage,
}


#[derive(Debug, Clone, Serialize, Deserialize)]
struct CompletionChoice {
    index: i64,
    message: CompletionChoiceMessage,
    finish_reason: String,
}


#[derive(Debug, Clone, Serialize, Deserialize)]
struct CompletionChoiceMessage {
    role: String,
    content: String,
}


#[derive(Debug, Clone, Serialize, Deserialize)]
struct CompletionUsage {
    prompt_tokens: i64,
    completion_tokens: i64,
    total_tokens: i64,
}


async fn chat_request(host: String, api_key: String, req: CreateChatCompletionRequest) -> anyhow::Result<CreateChatCompletionResponse> {
    // Format the url...
    let url = match format_url(host) {
        Ok(u) => u,
        Err(e) => return Err(e),
    };

    // Send the request...
    let res = reqwest::Client::new()
        .post(&url)
        .json(&req)
        .bearer_auth(api_key)
        .send()
        .await?;

    // Check the status code...
    if !res.status().is_success() {
        return Err(anyhow!("Failed to create chat completion: {}", res.status()));
    }

    // Deserialize the response and return...
    let data = res
        .json::<CreateChatCompletionResponse>()
        .await?;
    Ok(data)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatMessage {
    pub id: i64,
    pub role: String,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatRequest {
    #[serde(rename = "chatId")]
    pub chat_id: i64,
    pub messages: Vec<ChatMessage>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatResponse {
    #[serde(rename = "chatId")]
    pub chat_id: i64,
    pub messages: Vec<ChatMessage>,
}

#[tauri::command]
pub async fn send_chat_request(state: tauri::State<'_, Mutex<AppState>>, request: ChatRequest) -> Result<ChatResponse, String> {
    // Get the app state...
    let state = state.lock().await;

    // Get the settings...
    let settings = match _get_settings(&state) {
        Ok(s) => s,
        Err(e) => return Err(e.to_string()),
    };

    // Get the API key and base URL from the settings...
    let api_key = settings.api_token;
    let url = settings.api_base_url;

    // Create the request...
    let req = CreateChatCompletionRequest {
        model: settings.model,
        messages: request.messages.iter().map(|m| ChatMessageEntry {
            role: m.role.clone(),
            content: m.content.clone(),
        }).collect(),
    };

    // Send the request...
    let res = match chat_request(url, api_key, req).await {
        Ok(r) => r,
        Err(e) => return Err(e.to_string()),
    };

    // Get the best choice...
    let c = match res.choices.get(0) {
        Some(c) => c.clone(),
        None => return Err("No choices returned".into()),
    };

    let CompletionChoice{index: id, message, finish_reason: _} = c;
    let CompletionChoiceMessage{role, content} = message;

    let mut messages = request.messages.clone();
    messages.push(ChatMessage {
        id,
        role,
        content,
    });

    // Format the response and return...
    Ok(ChatResponse {
        chat_id: request.chat_id,
        messages,
    })
}

