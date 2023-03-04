use serde::{Serialize, Deserialize};


#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Settings {
    api_host: String,
    model: String,
    api_token: String,
    system_prompt: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            api_host: "https://api.openai.com".into(),
            model: "gpt-3.5-turbo".into(),
            api_token: "secret".into(),
            system_prompt: "You are a helpful assistant.".into(),
        }
    }
}

pub struct AppState {
    pub config_dir: Option<String>,
    pub data_dir: Option<String>,
}

#[tauri::command]
pub fn get_default_settings() -> Settings {
    Settings::default()
}

#[tauri::command]
pub fn get_settings(state: tauri::State<AppState>) -> Result<Settings, String> {
    // Get the config path...
    let path = match state.config_dir {
        Some(ref p) => p.clone(),
        None => return Err("Failed to get config path".into()),
    };

    // Read the raw settings file...
    let raw = match std::fs::read_to_string(path) {
        Ok(c) => c,
        Err(_) => return Err("Failed to read settings".into()),
    };

    // Deserialize the settings json data...
    match serde_json::from_str(&raw) {
        Ok(s) => s,
        Err(_) => Err("Failed to deserialize settings".into()),
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
    let path = match state.config_dir {
        Some(ref p) => p.clone(),
        None => return Err("Failed to get config path".into()),
    };

    // Write the raw settings file...
    match std::fs::write(path, raw) {
        Ok(_) => Ok(()),
        Err(_) => Err("Failed to write settings".into()),
    }
}