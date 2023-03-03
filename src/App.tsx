import { useState } from 'react';
import { MantineProvider, Text } from '@mantine/core';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import { Shell } from './components/Shell';


const chatItems = [
  {id: 1, name: "Chat 1"},
  {id: 2, name: "Chat 2"},
  {id: 3, name: "Chat 3"},
  {id: 4, name: "Chat 4"},
];


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
      >
        {settingsOpen && (<Text>Settings</Text>)}
        {!settingsOpen && activeChatId && (<Text>Chat: { activeChatId }</Text>)}
        {!settingsOpen && !activeChatId && (<Text>New Chat</Text>)}
      </Shell>
    </MantineProvider>
  );
}
export default App;

