import { useState, useEffect } from 'react';
import { MantineProvider, Anchor } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications, notifications } from '@mantine/notifications';

import Shell from './components/Shell';
import Settings from './components/Settings';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import { IMessageData } from "./components/Message";

import * as api from './api';


function App() {
  // App page state...
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Get and configure the app settings...
  const [appSettings, setAppSettings] = useState<undefined | api.SettingsType>(undefined);
  const updateSettings = (settings: api.SettingsType) => {
    api
      .setSettings(settings)
      .then(() => api.getSettings())
      .then((s) => setAppSettings(s))
      .then(() => {
        notifications.show({
            id: "success-saving-settings",
            title: `Settings Updated`,
            message: "Successfully updated app settings.",
            autoClose: 2000,
          });
      })
      .catch(err => {
        console.error(`Failed to set settings: ${err}`);
        notifications.show({
          id: "err-saving-settings",
          title: "Failed to Save Settings",
          message: `Got error: ${err}`,
          color: "red",
        });
      });
  };
  useEffect(() => {
    api
      .getSettingsOrSetDefault()
      .then((settings) => setAppSettings(settings))
      .catch(err => {
        console.error(`Failed to get settings: ${err}`);
        notifications.show({
          id: "err-loading-settings",
          title: "Failed to Load Settings",
          message: `Got error: ${err}`,
          color: "red",
        });
      });
  }, []);

  // Get and configure the chat lists...
  const [chatItems, setChatItems] = useState<api.ListChatsResponseType>([]);
  useEffect(() => {
    api
      .listChats()
      .then((chats) => setChatItems(chats))
      .catch(err => {
        console.error(`Failed to get chat list: ${err}`);
        notifications.show({
          id: "err-load-chats-initial",
          title: "Failed to Load Chat List",
          message: `Got error: ${err}`,
          color: "red",
        });
      });
  }, []);

  // Create hook to set active chat...
  const [activeChatId, _setActiveChatId] = useState<number | undefined>(undefined);
  const [chatMessages, setChatMessages] = useState<IMessageData[]>([]);
  const setActiveChatId = (cid: number | undefined) => {
    // Set the active chat ID...
    _setActiveChatId(cid);

    // If it's an actual chat ID, get and set the messages...
    if (cid !== undefined) {
      api
        .getMessages({chatId: cid})
        .then((chat) => setChatMessages(chat))
        .catch(err => {
          console.error(`Failed to get chat: ${err}`);
          notifications.show({
            id: "err-get-chat-messages",
            title: `Failed to Get Chat`,
            message: `Failed to get chat with id=${cid}. Got error: ${err}`,
            color: "red",
          });
        });
    }
  };

  // Configure hook to send messages...
  const [chatMsgLoading, setChatMsgLoading] = useState(false);
  const sendMessage = (m: string) => {
    // Check if an API token exists...
    if (appSettings?.apiToken === undefined || appSettings?.apiToken === "") {
      notifications.show({
        id: "err-sending-message-no-token",
        title: `API Token Not Set`,
        message: (
          <>
            Make sure to set an API token in the <Anchor component='button' onClick={() => {
              setSettingsOpen(true);
              notifications.hide('err-sending-message-no-token');
            }}>Settings</Anchor>.
          </>
        ),
        color: "red",
      });
      return;
    }

    // Send the message...
    if (activeChatId !== undefined && !chatMsgLoading) {
      setChatMsgLoading(true);
      api
        .sendChatRequest({
          chatId: activeChatId, 
          previousMessages: chatMessages,
          newMessage: m,
        })
        .then(res => setChatMessages(res.messages))
        .catch(err => {
          console.error(`Failed to send message: ${err}`);
          notifications.show({
            id: "err-sending-message",
            title: `Failed to Send API Request`,
            message: `Got error: ${err}`,
            color: "red",
          });
        })
        .finally(() => setChatMsgLoading(false));
    }
  }

  // Configure hook to create new chat...
  const onNewChat = () => api
    .addChat({})
    .then(id => {
      setSettingsOpen(false);
      setActiveChatId(id);
    })
    .then(() => api.listChats())
    .then((chats) => setChatItems(chats))
    .catch(err => {
      console.error(`Failed to add new chat: ${err}`);
      notifications.show({
        id: "err-create-chat",
        title: "Failed to Create Chat",
        message: `Got error: ${err}`,
        color: "red",
      });
    });

  // Create callback for editing chat name...
  const onEditChatName = ({id, newName}: {id: number, newName?: string}) => api
    .renameChat({id, name: newName})
    .then(() => api.listChats())
    .then((chats) => setChatItems(chats))
    .catch(err => {
      console.error(`Failed to rename chat: ${err}`);
      notifications.show({
        id: "err-rename-chat",
        title: "Failed to Rename Chat",
        message: `Got error: ${err}`,
        color: "red",
      });
    });

  // Create callback for deleting chat...
  const onDeleteChat = (cid: number) => {
    api
      .deleteChat({id: cid})
      .then(() => api.listChats())
      .then((chats) => {
        setChatItems(chats);
        setActiveChatId(undefined);
      })
      .catch(err => {
        console.error(`Failed to delete chat: ${err}`);
        notifications.show({
          id: "err-delete-chat",
          title: "Failed to Delete Chat",
          message: `Failed to delete chat id=${cid}. Got error: ${err}`,
          color: "red",
        });
      });
  }

  // Create callback for clearing chats...
  const onClearChats = () => Promise.all(
    chatItems.map((c) => api
      .deleteChat({id: c.id})
      .catch(err => console.error(`Failed to delete chat: ${err}`))
    ))
    .then(() => api.listChats())
    .then((chats) => {
      setChatItems(chats);
      setActiveChatId(undefined);
    })
    .catch(err => {
      console.error(`Failed to delete chats: ${err}`);
      notifications.show({
        id: "err-clear-all-chats",
        title: "Failed to Clear All Chats",
        message: `Got error: ${err}`,
        color: "red",
      });
    });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Notifications />
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
          onClearChats={onClearChats}
        >
          {settingsOpen && (
            <Settings 
              initialData={appSettings}
              setConfigData={(data) => updateSettings(data)}
            />
          )}
          {!settingsOpen && !activeChatId && (
            <NewChat
              onNewChat={onNewChat}
            />
          )}
          {!settingsOpen && activeChatId && (
            <Chat 
              messages={chatMessages}
              onMessage={sendMessage}
              chatLoading={chatMsgLoading}
            />
          )}
        </Shell>
      </ModalsProvider>
    </MantineProvider>
  );
}
export default App;

