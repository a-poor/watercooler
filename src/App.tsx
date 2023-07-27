import { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import toast, { Toaster } from 'react-hot-toast';

import NavBar, { NavBarTabs } from '@/components/NavBar';
import ChatTab from '@/components/ChatTab';
import TemplateTab from '@/components/TemplateTab';
import CodeTab from '@/components/CodeTab';
import AppSettings from '@/components/AppSettings';


function App() {
  const [activeTab, setActiveTab] = useState<NavBarTabs>('chat');
  // useEffect(() => {
  //   setTimeout(() => {
  //     toast.success("Welcome to the chat app!");
  //   }, 1000);
  // }, []);
  return (
    <Tooltip.Provider>
      <div className="flex flex-row h-screen">
        <NavBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <main className="flex-grow">
          {activeTab === 'chat' && (
            <ChatTab />
          )}
          {activeTab === 'templates' && (
            <TemplateTab />
          )}
          {activeTab === 'code' && (
            <CodeTab />
          )}
          {activeTab === 'settings' && (
            <AppSettings />
          )}
        </main>
      </div>
      <Toaster />
    </Tooltip.Provider>
  );
}
export default App;

