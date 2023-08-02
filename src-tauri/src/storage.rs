#![allow(dead_code)]

/// A record in the settings table.
/// 
/// Note that (it is expected that) there is only ever 
/// one record in the settings table.
pub struct SettingRecord {
    /// The version number of the database.
    pub version: usize,

    /// The base url for the OpenAI API.
    pub api_base_url: String,

    /// The user's OpenAI API token.
    pub api_token: String,

    /// The default model.
    pub default_model: String,

    /// The default system prompt.
    pub default_system_prompt: String,
}


pub struct ChatRecord {
    /// The id of the chat.
    pub id: usize,

    /// The human-friendly name of the chat.
    pub name: String,

    /// The temperature setting for the chat API.
    pub temperature: Option<f32>,

    /// The temperature setting for the chat API.
    pub max_length: Option<usize>,

    /// The presence_penalty setting for the chat API.
    pub presence_penalty: Option<f32>,
    
    /// The frequency_penalty setting for the chat API.
    pub frequency_penalty: Option<f32>,
    
    /// The temperature setting for the chat API.
    pub top_p: Option<f32>,
        
    /// The temperature setting for the chat API.
    pub model: String,

    /// The temperature setting for the chat API.
    pub allow_functions: bool,

    /// The template this chat is based on.
    pub from_template: Option<String>,

    /// Whether or not this chat is archived.
    pub archived: bool,
}

impl Default for ChatRecord {
    fn default() -> Self {
        Self {
            id: 0,
            name: "".into(),
            temperature: None,
            max_length: None,
            presence_penalty: None,
            frequency_penalty: None,
            top_p: None,
            model: "gpt-4".into(),
            allow_functions: false,
            from_template: None,
            archived: false,
        }
    }
}


pub struct ChatMessageRecord {
    pub id: usize,
    pub chat_id: usize,
    pub role: String,
    pub content: String,
    pub name: Option<String>,
    pub function_call_json: Option<String>,
}


pub struct TemplateRecord {
    /// The id of the chat.
    pub id: usize,

    /// The human-friendly name of the chat.
    pub name: String,

    /// The temperature setting for the chat API.
    pub temperature: Option<f32>,

    /// The temperature setting for the chat API.
    pub max_length: Option<usize>,

    /// The presence_penalty setting for the chat API.
    pub presence_penalty: Option<f32>,
    
    /// The frequency_penalty setting for the chat API.
    pub frequency_penalty: Option<f32>,
    
    /// The temperature setting for the chat API.
    pub top_p: Option<f32>,
        
    /// The temperature setting for the chat API.
    pub model: String,

    /// The temperature setting for the chat API.
    pub allow_functions: bool,
}


pub struct TemplateMessageRecord {}


pub struct CodeRecord {}

