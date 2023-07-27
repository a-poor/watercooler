import { useState, useEffect, ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
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

import ChatMessageList from '@/components/ChatMessageList';
import ChatInput from '@/components/ChatInput';
import { IChatDetails } from '@/api';


const demoChat = {
  id: "001",
  name: "Demo Template",
  createdAt: "2023-07-01 12:00:00",
  updatedAt: "2023-07-24 08:30:00",
  archived: true,
  model: "gpt-4",
  fromTemplate: {
    id: "001",
    name: "Demo Template",
  },
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


export interface ITemplateProps {
  /** The ID of the chat. */
  id?: string;

  /** Action to perform when 'back' button is pressed. */
  onBack?: () => void;

  onRename?: () => void;
  onArchive?: () => void;
  onUnarchive?: () => void;
  onDelete?: () => void; 
  onDuplicate?: () => void;
  onExport?: () => void;
  onMakeTemplate?: () => void;
  onOpenSettings?: () => void;
}

/**
 * A component that shows a single chat template and allows the user to
 * edit the template's contents and settings.
 */
function Template(props: ITemplateProps) {
  const { 
    id,
    name,
    createdAt,
    updatedAt,
    archived,
    model,
    fromTemplate,
    messages,
  } = demoChat;

  // Get the chat-level actions...
  const {
    onBack,
    onRename,
    onArchive,
    onUnarchive,
    onDelete,
    onDuplicate,
    onExport,
    onMakeTemplate,
    onOpenSettings,
  } = props;

  // If the ID is not set, don't show anything...
  if (!id) {
    return <></>;
  }
  return (
    <div className="h-screen flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-4 w-full">
        <h1 className="w-full font-semibold text-3xl mb-6 line-clamp-1">
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
              action: onRename,
            },
            {
              icon: <ArchiveIcon className="w-4 h-4"/>,
              text: archived ? "Unarchive" : "Archive",
              tooltip: archived ? "Unarchive chat" : "Archive chat",
              action: archived ? onUnarchive : onArchive,
            },
            {
              icon: <TrashIcon className="w-4 h-4"/>,
              text: "Delete",
              tooltip: "Delete Permanently",
              action: onDelete,
            },
            {
              icon: <CopyIcon className="w-4 h-4"/>,
              text: "Duplicate",
              tooltip: "Duplicate chat",
              action: onDuplicate,
            },
            {
              icon: <MixIcon className="w-4 h-4"/>,
              text: "Settings",
              tooltip: "Open chat settings",
              action: onOpenSettings,
            },
          ]}
        />

        {/* (Temp?) Chat Tags */}
        <div className="mb-2 font-sm">
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
                template: { fromTemplate.name }
              </span>
            )}
            {archived && (
              <span 
                className="
                  inline-flex 
                  items-center 
                  rounded-md 
                  bg-yellow-50 
                  px-2 
                  py-1 
                  text-xs 
                  font-medium 
                  text-yellow-700 
                  ring-1 
                  ring-inset 
                  ring-yellow-600/20
                "
              >
                archived
              </span>
            )}
          </div>
          {/* More? ... */}
        </div>
      </div>

      {/* The list of messages... */}
      <ChatMessageList />
      
      {/* The input for sending new messages... */}
      <ChatInput 
        onSubmit={(message: string) => { console.log(message); }}
      />
    </div>
  );
}
export default Template;
