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
  name: "Demo Chat",
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

interface IDeleteConfirmAlertProps {
  children?: ReactNode;
}

function DeleteConfirmAlert({children}: IDeleteConfirmAlertProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
          Delete account
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Yes, delete account
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}


export interface IChatProps {
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
 * A component that shows a chat thread and allows the user to 
 * send messages, edit messages, delete messages, and modity
 * the chat's settings.
 */
function Chat(props: IChatProps) {
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
              icon: <DownloadIcon className="w-4 h-4"/>,
              text: "Export",
              tooltip: "Export chat",
              action: onExport,
            },
            {
              icon: <Component1Icon className="w-4 h-4"/>,
              text: "Make template",
              tooltip: "Make template from chat",
              action: onMakeTemplate,
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
export default Chat;

