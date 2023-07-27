import { useState } from 'react';
import TemplateList from '@/components/TemplateList';
import Template from '@/components/Template';
import TemplateSettings from '@/components/TemplateSettings';


enum OpenTab {
  List = 'list',
  Template = 'template',
  // Settings = 'settings',
}

function TemplateTab() {
  const [openTab, setOpenTab] = useState<OpenTab>(OpenTab.List);
  const [activeTemplate, setActiveTemplate] = useState<string | null>("abc123");
  return (
    <>
      {openTab === OpenTab.List && (
        <TemplateList 
          openChat={(id: string) => {
            // Set the active chat's ID...
            setActiveTemplate(id);

            // And open the chat tab...
            setOpenTab(OpenTab.Template);
          }}
          // openSettings={() => setOpenTab(OpenTab.Settings)}
        />
      )}
      {openTab === OpenTab.Template && (
        <Template
          id={activeTemplate || undefined}
          onBack={() => setOpenTab(OpenTab.List)}
        />
      )}
      {/* {openTab === OpenTab.Settings && (
        <TemplateSettings 
          // onBack={() => setOpenTab(OpenTab.List)}
        />
      )} */}
    </>
  );
}
export default TemplateTab;

