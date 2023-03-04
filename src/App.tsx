import { useState, useReducer } from 'react';
import { MantineProvider, Text } from '@mantine/core';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import Shell from './components/Shell';
import Settings from './components/Settings';
import NewChat from './components/NewChat';
import Chat from './components/Chat';


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


function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<number | undefined>(undefined);

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
          <Chat />
        )}
      </Shell>
    </MantineProvider>
  );
}
export default App;

