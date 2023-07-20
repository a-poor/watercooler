import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

import NavBar, { NavBarTabs } from '@/components/NavBar';


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
          <h1 className="underline">
            Hello, World!
          </h1>
        </main>
      </div>
    </Tooltip.Provider>
  );
}
export default App;

