import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

import NavBar, { NavBarTabs } from '@/components/NavBar';
import ChatTab from '@/components/ChatTab';
import TemplateTab from '@/components/TemplateTab';
import CodeTab from '@/components/CodeTab';
import AppSettings from '@/components/AppSettings';


function App() {
  const [activeTab, setActiveTab] = useState<NavBarTabs>('chat');
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
    </Tooltip.Provider>
  );
}
export default App;

