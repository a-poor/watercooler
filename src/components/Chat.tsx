import { useState, useEffect, ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { 
  ArrowLeftIcon,
  Pencil2Icon, 
  ArchiveIcon,
  TrashIcon,
  CopyIcon,
  DownloadIcon,
  Component1Icon,
  MixIcon,
} from '@radix-ui/react-icons';

import type { IChatDetails } from '@/api';


const demoChat = {
  id: "001",
  name: "Demo Chat",
  createdAt: "2023-07-01 12:00:00",
  updatedAt: "2023-07-24 08:30:00",
  archived: false,
  model: "gpt-4",
  messages: [],
} satisfies IChatDetails;


interface IMenuButtonProps {
  children?: ReactNode;
  tooltip?: string;
  onClick?: () => void;
}

function MenuButton({children, tooltip, onClick}: IMenuButtonProps) {
  return (
    <>
      <Tooltip.Provider>
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
      </Tooltip.Provider>
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
    <div className="mb-6 flex flex-row items-center space-x-2">
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


export interface IChatProps {
  /** The ID of the chat. */
  cid?: string;

  onBack?: () => void;
}

/**
 * A component that shows a chat thread and allows the user to 
 * send messages, edit messages, delete messages, and modity
 * the chat's settings.
 */
function Chat({onBack}: IChatProps) {
  // if (!cid) {
  //   return <h1>No chat selected.</h1>;
  // }

  const { 
    id,
    name,
    createdAt,
    updatedAt,
    model,
    messages,
  } = demoChat;

  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <h1 className="font-semibold text-3xl mb-6 line-clamp-1">
          { name }
        </h1>
        
        {/* Button to create a new chat or show archived chats. */}
        <MenuBar 
          items={[
            {
              icon: <ArrowLeftIcon className="w-4 h-4"/>,
              text: "Back",
              tooltip: "Go back to the chat list.",
              action: onBack,
            },
            {
              icon: <Pencil2Icon className="w-4 h-4"/>,
              text: "Rename",
              tooltip: "Rename chat",
              action: () => {},
            },
            {
              icon: <ArchiveIcon className="w-4 h-4"/>,
              text: "Archive",
              tooltip: "Archive chat",
              action: () => {},
            },
            {
              icon: <TrashIcon className="w-4 h-4"/>,
              text: "Delete",
              tooltip: "Delete Permanently",
              action: () => {},
            },
            {
              icon: <CopyIcon className="w-4 h-4"/>,
              text: "Duplicate",
              tooltip: "Duplicate chat",
              action: () => {},
            },
            {
              icon: <DownloadIcon className="w-4 h-4"/>,
              text: "Export",
              tooltip: "Export chat",
              action: () => {},
            },
            {
              icon: <Component1Icon className="w-4 h-4"/>,
              text: "Make template",
              tooltip: "Make template from chat",
              action: () => {},
            },
            {
              icon: <MixIcon className="w-4 h-4"/>,
              text: "Settings",
              tooltip: "Open chat settings",
              action: () => {},
            },
          ]}
        />

        {/* (Temp) Chat Tags */}
        <div className="mb-6 font-sm">
          <span className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            { model }
          </span>
          {/* ... */}
        </div>

        {/* List of chats. */}
        <div className="scroll-y-auto">
          <ul className="flex flex-col space-y-2 -mx-1">
            {/* {chats
              .filter(c => showArchived || !c.archived)
              .map(c => (
                <li key={c.id} className="flex flex-row hover:bg-slate-100 rounded-lg">
                  <ChatItem 
                    name={c.name}
                    archived={c.archived}
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
            ))} */}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Chat;

