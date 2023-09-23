import { useState, ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PlusIcon, DotsHorizontalIcon, MixIcon, StackIcon, ArchiveIcon } from '@radix-ui/react-icons';

import type { IChatSummary } from '@/api';


const dummyChats: IChatSummary[] = [
  {
    id: "01",
    name: "Rust vs Go vs JavaScript",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: false,
    fromTemplate: "Demo Template 1",
    model: "gpt-4",
  },
  {
    id: "02",
    name: "Single table design",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: true,
    model: "gpt-3.5-turbo",
  },
  {
    id: "03",
    name: "Writing a desktop app with JavaScript",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: false,
    fromTemplate: "Demo Template 1",
  },
  {
    id: "04",
    name: "Blog post ideas",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: true,
  },
];


interface IMenuButtonProps {
  children?: ReactNode;
  tooltip?: string;
  onClick?: () => void;
}

function MenuButton({children, tooltip, onClick}: IMenuButtonProps) {
  return (
    <>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={onClick}
            className="
              flex-shrink-0 
              flex-grow-0 
              basis-auto 
              text-mauve11 
              h-[25px] 
              px-[5px] 
              rounded 
              inline-flex 
              text-[13px] 
              leading-none 
              items-center 
              justify-center 
              bg-white 
              ml-0.5 
              outline-none 
              hover:bg-violet3 
              hover:text-violet11 
              focus:relative 
              focus:shadow-[0_0_0_2px] 
              focus:shadow-violet7 
              first:ml-0
            "
          >
            { children }
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="
              data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade 
              data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
              data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
              data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
              text-violet11 
              select-none 
              rounded-[4px] 
              bg-white 
              px-[15px] 
              py-[10px] 
              text-[15px] 
              leading-none 
              shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
              will-change-[transform,opacity]
            "
            sideOffset={5}
          >
            { tooltip }
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </>
  );
}

interface IMenuBarProps {
  items: {
    icon: ReactNode;
    text: string;
    tooltip?: string;
    action?: () => void;
  }[];
}

function MenuBar({ items }: IMenuBarProps) {
  return (
    <div className="mb-3 flex flex-row items-center space-x-2">
      {items.map((item, i) => (
        <div key={i}>
          <MenuButton 
            onClick={item.action}
            tooltip={item.tooltip}
          >
            <div className="flex flex-row items-center space-x-1">
              <div>
                { item.icon }
              </div>
              <div className="hidden md:block">
                { item.text }
              </div>
            </div>
          </MenuButton>
        </div>
      ))}
    </div>
  );
}


export interface IChatItemMenuProps {
  /** Action to perform when the user clicks "Rename" */
  onRename?: () => void;
  /** Is the message archived? */
  archived: boolean;
  /** Action to perform to archive the chat. */
  onArchive?: () => void;
  /** Action to perform to unarchive the chat. */
  onUnarchive?: () => void;
  /** Action to perform to delete the chat, perminently. */
  onDelete?: () => void;
  /** Action to perform to duplicate the chat. */
  onDuplicate?: () => void;
  /** Action to perform to export the chat. */
  onExport?: () => void;
  /** Action to perform to create a template from the chat. */
  onCreateTemplate?: () => void;
}

function ChatItemMenu({archived, onArchive, onUnarchive, onRename, onDelete, onDuplicate, onExport, onCreateTemplate}: IChatItemMenuProps) {
  const menuItems: {text: string, action: () => void}[] = [
    {
      text: "Rename Chat",
      action: () => onRename?.(),
    },
    {
      text: "Duplicate Chat",
      action: () => onDuplicate?.(),
    },
    {
      text: "Make Template",
      action: () => onCreateTemplate?.(),
    },
    {
      text: archived ? "Unarchive Chat" : "Archive Chat",
      action: () => { 
        if (archived) { 
          onUnarchive?.();
        } else { 
          onArchive?.();
        }
      },
    },
    {
      text: "Export Chat",
      action: () => onExport?.(),
    },
    {
      text: "Delete Permamently",
      action: () => onDelete?.(),
    },
  ];
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="hover:bg-slate-200 px-1 py-1 rounded-md">
            <DotsHorizontalIcon className="w-5 h-5"/>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="
              min-w-[175px]
              bg-white 
              rounded-md 
              p-[5px] 
              shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] 
              will-change-[opacity,transform] 
              data-[side=top]:animate-slideDownAndFade 
              data-[side=right]:animate-slideLeftAndFade 
              data-[side=bottom]:animate-slideUpAndFade 
              data-[side=left]:animate-slideRightAndFade
            "
            sideOffset={5}
          >
            {menuItems.map((d, i) => (
              <DropdownMenu.Item
                key={i}
                className="
                  text-[13px]
                  leading-none
                  text-violet11
                  rounded-[3px]
                  flex
                  items-center
                  h-[25px]
                  px-[5px]
                  relative
                  pl-3
                  select-none
                  outline-none
                  data-[highlighted]:bg-violet9 
                  data-[highlighted]:text-violet1
                "
                onSelect={d.action}
              >
                { d.text }
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}


interface IChatItemProps {
  /** The name of the chat thread. */
  name: string;
  /** Is the message archived? */
  archived: boolean;
  /** The name of the template this chat is based on, if any. */
  fromTemplate?: string;
  /** The name of the model used by this chat. */
  model?: string;
  /** Action to perform to open the chat. */
  onOpen?: () => void;
  /** Action to perform to rename the chat */
  onRename?: () => void;
  /** Action to perform to archive the chat. */
  onArchive?: () => void;
  /** Action to perform to unarchive the chat. */
  onUnarchive?: () => void;
  /** Action to perform to delete the chat, perminently. */
  onDelete?: () => void;
  /** Action to perform to duplicate the chat. */
  onDuplicate?: () => void;
  /** Action to perform to export the chat. */
  onExport?: () => void;
  /** Action to perform to create a template from the chat. */
  onCreateTemplate?: () => void;
}

function ChatItem({name, archived, fromTemplate, model, onOpen, ...actions}: IChatItemProps) {
  return (
    <>
      <button className="px-3 py-2 flex-grow text-left space-y-1" onClick={onOpen}>
        <div className={archived ? "line-through text-slate-500" : ""}>
          { name }
        </div>
        <div className="flex flex-row space-x-2">
          {model && (
            <span 
              className="
                inline-flex 
                items-center 
                rounded-md 
                bg-indigo-50 
                px-2 
                py-1 
                text-xs 
                font-medium 
                text-indigo-700 
                ring-1 
                ring-inset 
                ring-indigo-700/10
              "
            >
              model: { model }
            </span>
          )}
          {fromTemplate && (
            <span 
              className="
                inline-flex 
                items-center 
                rounded-md 
                bg-green-50 
                px-2 
                py-1 
                text-xs 
                font-medium 
                text-green-700 
                ring-1 
                ring-inset 
                ring-green-600/20
              "
            >
              template: { fromTemplate }
            </span>
          )}
        </div>
      </button>
      <div className="mx-3 my-2">
        <ChatItemMenu 
          archived={archived}
          {...actions}
        />
      </div>
    </>
  );
}


export interface IChatListProps {
  createChat?: () => void;
  createChatFromTemplate?: () => void;
  openChat?: (id: string) => void;
  openSettings?: () => void;
}

/**
 * A component that displays a list of chats, archived chats,
 * and a button to create a new chat.
 */
function ChatList({createChat, createChatFromTemplate, openChat, openSettings}: IChatListProps) {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [chats, _setChats] = useState<IChatSummary[]>(dummyChats);
  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-4 h-full flex flex-col">
        <h1 className="font-semibold text-3xl mb-6">
          Your Chats
        </h1>

        <MenuBar 
          items={[
            {
              icon: <PlusIcon className="w-4 h-4"/>,
              text: "New Chat",
              tooltip: "Create a new chat",
              action: createChat,
            },
            {
              icon: <StackIcon className="w-4 h-4"/>,
              text: "New from Template",
              tooltip: "Create a new chat from a template",
              action: createChatFromTemplate,
            },
            {
              icon: <MixIcon className="w-4 h-4"/>,
              text: "Chat Settings",
              tooltip: "Open general chat settings",
              action: openSettings,
            },
            {
              icon: <ArchiveIcon className="w-4 h-4"/>,
              text: showArchived ? "Hide Archived" : "Show Archived",
              tooltip: showArchived ? "Hide archived chats" : "Show archived chats",
              action: () => setShowArchived(!showArchived),
            },
          ]}
        />

        {/* List of chats. */}
        <div className="flex-grow overflow-x-hidden overflow-y-scroll">
          <ul className="h-full flex flex-col space-y-2 -mx-1">
            {chats
              .filter(c => showArchived || !c.archived)
              .map(c => (
                <li key={c.id} className="flex flex-row hover:bg-slate-100 rounded-lg">
                  <ChatItem 
                    name={c.name}
                    archived={c.archived}
                    fromTemplate={c.fromTemplate}
                    model={c.model}
                    onOpen={() => openChat?.(c.id)}
                    onRename={() => console.log(`Rename-ing chat ${c.id}`)}
                    onArchive={() => console.log(`Archive-ing chat ${c.id}`)}
                    onUnarchive={() => console.log(`Unarchive-ing chat ${c.id}`)}
                    onDelete={() => console.log(`Delete-ing chat ${c.id}`)}
                    onDuplicate={() => console.log(`Duplicate-ing chat ${c.id}`)}
                    onExport={() => console.log(`Export-ing chat ${c.id}`)}
                    onCreateTemplate={() => console.log(`CreateTemplate-ing chat ${c.id}`)}
                  />
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ChatList;

