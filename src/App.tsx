import { useState, useReducer } from 'react';
import { MantineProvider, Text } from '@mantine/core';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import Shell from './components/Shell';
import Settings from './components/Settings';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import { Role, IMessageData } from "./components/Message";


const chatItems = [
  {id: 1, name: "Chat 1: How to write a blog post?"},
  {id: 2, name: "Chat 2"},
  {id: 3, name: "Chat 3"},
  {id: 4, name: "Chat 4"},
];

const defaultConfig = {
  apiHost: "https://api.openai.com",
  model: "gpt-3.5-turbo",
  apiToken: "secret",
  systemPrompt: "You are a helpful assistant."
} as const;

const demoChatData: IMessageData[] = [
  {
    id: 1,
    role: Role.System,
    content: "You are a helpful assistant."
  },
  {
    id: 2,
    role: Role.User,
    content: "What is your name?"
  },
  {
    id: 3,
    role: Role.Assistant,
    content: "My name is ChatGPT."
  },
  {
    id: 4,
    role: Role.User,
    content: "What are you?"
  },
  {
    id: 5,
    role: Role.Assistant,
    content: "My name is ChatGPT and I am an AI assistant. I'm a chatbot that uses OpenAI's GPT-3 API to generate responses to your messages. Also I'm a work in progress. I'm not very smart yet. I'm still learning. (The Github Copilot model generated that last part, just so you know)."
  },
  {
    id: 6,
    role: Role.User,
    content: "What is your name?"
  },
  {
    id: 7,
    role: Role.Assistant,
    content: "My name is ChatGPT."
  },
  {
    id: 8,
    role: Role.User,
    content: "What is your name?"
  },
  {
    id: 9,
    role: Role.Assistant,
    content: "My name is ChatGPT."
  },
];


function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number | undefined>(1);

  const [chatMsgLoading, setChatMsgLoading] = useState(false);
  const sendMessage = (m: string) => {
    setChatMsgLoading(true);
    setTimeout(() => {
      setChatMsgLoading(false);
      console.log(`Message "${m}" sent.`);
    }, 1000);
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Shell 
        chatItems={chatItems}
        activeChatId={activeChatId}
        settingsIsOpen={settingsOpen}
        onOpenSettings={() => setSettingsOpen(true)}
        onClickChat={(cid) => {
          setActiveChatId(cid);
          setSettingsOpen(false);
        }}
        onNewChat={() => {
          setActiveChatId(undefined);
          setSettingsOpen(false);
        }}
        onEditChatName={(cid) => console.log(`Editing chat: ${cid}`)}
        onDeleteChat={(cid) => console.log(`Deleting chat: ${cid}`)}
      >
        {settingsOpen && (
          <Settings 
            initialData={defaultConfig}
            setConfigData={(data) => console.log(`Setting config data: ${JSON.stringify(data)}`)}
          />
        )}
        {!settingsOpen && !activeChatId && (
          <NewChat />
        )}
        {!settingsOpen && activeChatId && (
          <Chat 
            messages={demoChatData}
            onMessage={sendMessage}
            chatLoading={chatMsgLoading}
          />
        )}
      </Shell>
    </MantineProvider>
  );
}
export default App;

