import { useState } from 'react';
import ChatList from '@/components/ChatList';
import Chat from '@/components/Chat';
import ChatSettings from '@/components/ChatSettings';


enum OpenTab {
  List = 'list',
  Chat = 'chat',
  Settings = 'settings',
}

function ChatTab() {
  const [openTab, setOpenTab] = useState<OpenTab>(OpenTab.Chat);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  return (
    <>
      {openTab === OpenTab.List && (
        <ChatList 
          openChat={(id: string) => {
            // Set the active chat's ID...
            setActiveChat(id);

            // And open the chat tab...
            setOpenTab(OpenTab.Chat);
          }}
          openSettings={() => setOpenTab(OpenTab.Settings)}
        />
      )}
      {openTab === OpenTab.Chat && (
        <Chat 
          onBack={() => setOpenTab(OpenTab.List)}
        />
      )}
      {openTab === OpenTab.Settings && (
        <ChatSettings />
      )}
    </>
  );
}
export default ChatTab;

