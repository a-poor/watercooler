import { AppShell, Navbar, NavLink, ScrollArea, Text, Divider, ActionIcon, Space } from '@mantine/core';
import { IconSettings, IconPlus, IconTrash, IconEdit, IconX } from '@tabler/icons-react';


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
  onEditChatName?: (id: number) => void;
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
          variant="subtle"
        />
      </Navbar.Section>
      <Divider />
      <Navbar.Section grow sx={{ overflowX: 'hidden' }}>
        {chatItems && chatItems.map(c => (
          <NavLink
            w="100%"
            key={c.id}
            label={(
              <Text fz="md" truncate="end">
                { c.name || `Chat ${c.id}` }
              </Text>
            )}
            icon={<IconPlus size={18} stroke={1.5} />}
            onClick={() => onClickChat?.(c.id)}
            active={!settingsIsOpen && activeChatId === c.id}
            rightSection={!settingsIsOpen && activeChatId === c.id && (
              <>
                <ActionIcon variant="subtle" onClick={() => onEditChatName?.(c.id)}>
                  <IconEdit size={18} stroke={1.5} />
                </ActionIcon>
                <Space w={3}/>
                <ActionIcon variant="subtle" onClick={() => onDeleteChat?.(c.id)}>
                  <IconX size={18} stroke={1.5} />
                </ActionIcon>
              </>
            )}
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
  onEditChatName?: (id: number) => void;
  onDeleteChat?: (id: number) => void;
  onClearChats?: () => void;
}

function Shell({ children, ...props }: IShellProps) {
  return (
    <AppShell navbar={<Nav {...props}/>}>
      { children }
    </AppShell>
  );
}
export default Shell;

