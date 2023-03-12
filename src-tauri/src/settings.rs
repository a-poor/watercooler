use std::sync::Mutex;
use anyhow::anyhow;
use rusqlite::Connection;
use serde::{Serialize, Deserialize};

/// The user's configurable settings.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Settings {
    /// The base URL for the OpenAI API.
    /// 
    /// Defaults to "https://api.openai.com".
    #[serde(rename = "apiBaseUrl")]
    pub api_base_url: String,

    /// The model to use for chat completion.
    #[serde(rename = "model")]
    pub model: String,

    /// The user's OpenAI API token.
    #[serde(rename = "apiToken")]
    pub api_token: String,

    /// The initial system prompt.
    #[serde(rename = "systemPrompt")]
    pub system_prompt: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            api_base_url: "https://api.openai.com".into(),
            model: "gpt-3.5-turbo".into(),
            api_token: "secret".into(),
            system_prompt: "You are a helpful assistant.".into(),
        }
    }
}

pub struct AppState {
    pub config_file_path: Option<String>,
    pub data_db_path: Option<String>,
    pub db_conn: Option<Mutex<Connection>>,
}

#[tauri::command]
pub fn get_default_settings() -> Settings {
    Settings::default()
}

pub fn _get_settings(state: &AppState) -> anyhow::Result<Settings> {
    // Get the config path...
    let path = match state.config_file_path {
        Some(ref p) => p.clone(),
        None => return Err(anyhow!("Failed to get config path")),
    };

    // Read the raw settings file...
    let raw = match std::fs::read_to_string(path) {
        Ok(c) => c,
        Err(_) => return Err(anyhow!("Failed to read settings")),
    };

    // Deserialize the settings json data...
    match serde_json::from_str::<Settings>(raw.as_str()) {
        Ok(s) => Ok(s),
        Err(_) => Err(anyhow!("Failed to deserialize settings")),
    }
}

#[tauri::command]
pub fn get_settings(state: tauri::State<AppState>) -> Result<Settings, String> {
    match _get_settings(&state) {
        Ok(s) => Ok(s),
        Err(_) => Err("Failed to get settings".into()),
    }
}

#[tauri::command]
pub fn set_settings(settings: Settings, state: tauri::State<AppState>) -> Result<(), String> {
    // Serialize the settings...
    let raw = match serde_json::to_string(&settings) {
        Ok(r) => r,
        Err(_) => return Err("Failed to serialize settings".into()),
    };

    // Get the config path...
    let path = match state.config_file_path {
        Some(ref p) => p.clone(),
        None => return Err("Failed to get config path".into()),
    };

    // Write the raw settings file...
    match std::fs::write(path, raw) {
        Ok(_) => Ok(()),
        Err(_) => Err("Failed to write settings".into()),
    }
}

