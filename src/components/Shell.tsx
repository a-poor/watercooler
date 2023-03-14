import { useState } from 'react';
import { AppShell, Navbar, NavLink, Tooltip, Text, Divider, ActionIcon, Space, TextInput, Box } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useClickOutside } from '@mantine/hooks';
import { IconSettings, IconPlus, IconTrash, IconEdit, IconX, IconMessageCircle, IconCheck } from '@tabler/icons-react';


export interface IChatItem {
  id: number;
  name?: string | null;
}

export interface INavProps {
  settingsIsOpen?: boolean;
  activeChatId?: number;
  chatItems?: IChatItem[];
  onNewChat?: () => void;
  onOpenSettings?: () => void;
  onClickChat?: (id: number) => void;
  onEditChatName?: ({id, newName}: {id: number, newName?: string}) => void;
  onDeleteChat?: (id: number) => void;
  onClearChats?: () => void;
}

export function Nav({settingsIsOpen, activeChatId, chatItems, onClickChat, onNewChat, onOpenSettings, onEditChatName, onDeleteChat, onClearChats}: INavProps) {
  const ref = useClickOutside(() => {
    setEditingChatId(undefined);
    setNewChatName("");
  });
  const [editingChatId, setEditingChatId] = useState<number | undefined>(undefined);
  const [newChatName, setNewChatName] = useState<string>("");
  const clearMessageModal = () => modals.openConfirmModal({
      title: 'Are you sure you want to delete all the chats?',
      centered: true,
      labels: { confirm: 'Yes, clear the chats', cancel: "No, go back" },
      confirmProps: { color: 'red' },
      onConfirm: () => onClearChats?.(),
  });
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
          <div key={c.id}>
            {editingChatId === c.id && (
              <Box ref={ref} sx={{display: "flex", alignItems: "center"}}>
                <TextInput
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.currentTarget.value)}
                  px={5} 
                  py={2} 
                  style={{ display: "inline-block", flexGrow: 1 }}
                />
                <Tooltip label="Confirm new name (or click away)">
                  <ActionIcon 
                    sx={{height: "100%"}}
                    onClick={() => {
                      let newName: string | undefined = newChatName?.trim();
                      if (newName === "") {
                        newName = undefined;
                      }
                      onEditChatName?.({id: c.id, newName});
                      setEditingChatId(undefined);
                      setNewChatName("");
                    }}
                  >
                    <IconCheck size={18} stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
              </Box>
            )}
            {editingChatId !== c.id && (
              <NavLink
                w="100%"
                label={(
                  <Text fz="md" truncate="end">
                    { c.name || `Chat ${c.id}` }
                  </Text>
                )}
                icon={editingChatId !== c.id && (<IconMessageCircle size={18} stroke={1.5} />)}
                onClick={() => onClickChat?.(c.id)}
                component={!settingsIsOpen && activeChatId === c.id ? "div" : "button"}
                active={!settingsIsOpen && activeChatId === c.id}
                rightSection={!settingsIsOpen && activeChatId === c.id && (
                  <>
                    <Tooltip label="Rename Chat">
                      <ActionIcon 
                        variant="subtle" 
                        onClick={() => {
                          setEditingChatId(c.id);
                          setNewChatName(c.name || "");
                        }}
                      >
                        <IconEdit size={18} stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                    <Space w={3}/>
                    <Tooltip label="Delete Chat">
                      <ActionIcon variant="subtle" onClick={() => onDeleteChat?.(c.id)}>
                        <IconX size={18} stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                  </>
                )}
              />
            )}
          </div>
        ))}
      </Navbar.Section>
      <Divider />
      <Navbar.Section>
        <NavLink 
          label={<Text fz="md">Clear All Chats</Text>} 
          icon={<IconTrash size={18} stroke={1.5} />}
          onClick={clearMessageModal}
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
  onEditChatName?: ({id, newName}: {id: number, newName?: string}) => void;
  onDeleteChat?: (id: number) => void;
  onClearChats?: () => void;
}

function Shell({ children, ...props }: IShellProps) {
  return (
    <AppShell 
      navbar={<Nav {...props}/>} 
      styles={{main: {
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}}
    >
      { children }
    </AppShell>
  );
}
export default Shell;

