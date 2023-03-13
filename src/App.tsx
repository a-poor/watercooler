import { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

import Shell from './components/Shell';
import Settings from './components/Settings';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import { Role, IMessageData } from "./components/Message";

import * as api from './api';


// const chatItems = [
//   {id: 1, name: "Chat 1: How to write a blog post?"},
//   {id: 2, name: "Chat 2"},
//   {id: 3, name: "Chat 3"},
//   {id: 4, name: "Chat 4"},
// ];

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
];


function App() {
  // App page state...
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Get and configure the app settings...
  const [appSettings, setAppSettings] = useState<undefined | api.SettingsType>(undefined);
  useEffect(() => {
    api
      .getSettingsOrSetDefault()
      .then((settings) => setAppSettings(settings))
      .catch(err => console.error(`Failed to get settings: ${err}`));
  }, []);

  // Get and configure the chat lists...
  const [chatItems, setChatItems] = useState<api.ListChatsResponseType>([]);
  useEffect(() => {
    api
      .listChats()
      .then((chats) => setChatItems(chats))
      .catch(err => console.error(`Failed to get chat list: ${err}`));
  }, []);

  // Create hook to set active chat...
  const [activeChatId, _setActiveChatId] = useState<number | undefined>(undefined);
  const [chatMessages, setChatMessages] = useState<IMessageData[]>([]);
  const setActiveChatId = (cid: number | undefined) => {
    // Set the active chat ID...
    _setActiveChatId(cid);

    // If it's an actual chat ID, get and set the messages...
    if (cid) {
      api
        .getMessages({chatId: cid})
        .then((chat) => {
          console.log(`Got chat: ${chat}`);
          setChatMessages(chat);
        })
        .catch(err => console.error(`Failed to get chat: ${err}`));
    }
  };

  // Configure hook to send messages...
  const [chatMsgLoading, setChatMsgLoading] = useState(false);
  const sendMessage = (m: string) => {
    if (activeChatId !== undefined && !chatMsgLoading) {
      setChatMsgLoading(true);
      api
        .sendChatRequest({chatId: activeChatId, messages: chatMessages})
        .then(res => setChatMessages(res.messages))
        .catch(err => console.error(`Failed to send message: ${err}`))
        .finally(() => setChatMsgLoading(false));
    }
  }

  // Configure hook to create new chat...
  const onNewChat = () => api
    .addChat({})
    .then(d => {
      setSettingsOpen(false);
      setActiveChatId(d.id);
    })
    .then(() => api.listChats())
    .then((chats) => setChatItems(chats))
    .catch(err => console.error(`Failed to add new chat: ${err}`));

  // Create callback for editing chat name...
  const onEditChatName = (cid: number) => console.log(`Editing chat: ${cid}`);

  // Create callback for deleting chat...
  const onDeleteChat = (cid: number) => console.log(`Deleting chat: ${cid}`);

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
        onNewChat={onNewChat}
        onEditChatName={onEditChatName}
        onDeleteChat={onDeleteChat}
      >
        {settingsOpen && (
          <Settings 
            initialData={appSettings}
            setConfigData={(data) => setAppSettings(data)}
          />
        )}
        {!settingsOpen && !activeChatId && (
          <NewChat onNewChat={onNewChat}/>
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

