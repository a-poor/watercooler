import { AppShell, Navbar, NavLink, ScrollArea, Text, Divider } from '@mantine/core';
import { IconSettings, IconPlus, IconTrash } from '@tabler/icons-react';

export interface IChatItem {
  id: number;
  name?: string;
}

export interface INavProps {
  settingsIsOpen?: boolean;
  activeChatId?: number;
  chatItems?: IChatItem[];
  onNewChat?: () => void;
  onOpenSettings?: () => void;
  onClickChat?: (id: number) => void;
  onEditChatName?: (id: number, name: string) => void;
  onDeleteChat?: (id: number) => void;
  onClearChats?: () => void;
}

export function Nav({ settingsIsOpen, activeChatId, chatItems, onClickChat, onNewChat, onOpenSettings, onEditChatName, onDeleteChat, onClearChats }: INavProps) {
  return (
    <Navbar width={{base: 250}} height="100%">
      <Navbar.Section>
        <NavLink 
          label={<Text fz="md">New Chat</Text>} 
          icon={<IconPlus size={18} stroke={1.5} />}
          onClick={onNewChat}
          active={!settingsIsOpen && !activeChatId}
        />
      </Navbar.Section>
      <Divider />
      <Navbar.Section grow component={ScrollArea}>
        {chatItems && chatItems.map(c => (
          <NavLink
            key={c.id}
            label={<Text fz="md">{ c.name || `Chat ${c.id}` }</Text>} 
            icon={<IconPlus size={18} stroke={1.5} />}
            onClick={() => onClickChat && onClickChat(c.id)}
            active={!settingsIsOpen && activeChatId === c.id}
          />
        ))}
      </Navbar.Section>
      <Divider />
      <Navbar.Section>
        <NavLink 
          label={<Text fz="md">Clear Chats</Text>} 
          icon={<IconTrash size={18} stroke={1.5} />}
          onClick={onClearChats}
        />
        <NavLink 
          label={<Text fz="md">Settings</Text>} 
          icon={<IconSettings size={18} stroke={1.5} />}
          onClick={onOpenSettings}
          active={settingsIsOpen}
        />
      </Navbar.Section>
    </Navbar>
  );
}

export interface IShellProps {
  children?: React.ReactNode;
  settingsIsOpen?: boolean;
  activeChatId?: number;
  chatItems?: IChatItem[];
  onNewChat?: () => void;
  onOpenSettings?: () => void;
  onClickChat?: (id: number) => void;
  onEditChatName?: (id: number, name: string) => void;
  onDeleteChat?: (id: number) => void;
  onClearChats?: () => void;
}

export function Shell({ children, settingsIsOpen, activeChatId, chatItems, onClickChat, onNewChat, onOpenSettings, onEditChatName, onDeleteChat, onClearChats }: IShellProps) {
  return (
    <AppShell
      navbar={(
        <Nav 
          settingsIsOpen={settingsIsOpen}
          activeChatId={activeChatId}
          chatItems={chatItems}
          onClickChat={onClickChat}
          onNewChat={onNewChat}
          onOpenSettings={onOpenSettings}
          onEditChatName={onEditChatName}
          onDeleteChat={onDeleteChat}
          onClearChats={onClearChats}
        />
      )}
    >
      { children }
    </AppShell>
  );
}

