import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import type { IChatSummary } from '@/api';


const dummyChats: IChatSummary[] = [
  {
    id: "01",
    name: "Rust vs Go vs JavaScript",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: false,
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
  },
  {
    id: "04",
    name: "Blog post ideas",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: true,
  },
];


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


export interface ITemplateListProps {
  createChat?: () => void;
  createChatFromTemplate?: () => void;
  openChat?: (id: string) => void;
  openSettings?: () => void;
}

/**
 * A component that shows a list of templates and allows the user to
 * create new templates, edit existing templates, and delete templates.
 */
function TemplateList({createChat, createChatFromTemplate, openChat, openSettings}: ITemplateListProps) {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [chats, _setChats] = useState<IChatSummary[]>(dummyChats);
  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-4 h-full flex flex-col">
        <h1 className="font-semibold text-3xl mb-6">
          Your Chat Templates
        </h1>
        
        {/* Button to create a new chat or show archived chats. */}
        <div className="mb-6 flex flex-row items-center space-x-2">
          {/* <div>
            <button
              onClick={createChat}
              className="
                text-violet11
                hover:bg-mauve3 
                h-[35px]
                justify-center 
                rounded-[4px] 
                bg-violet6
                font-medium 
                leading-none  
                focus:outline-none
                px-2
                flex
                space-x-2
                items-center
              "
            >
              <PlusIcon className="w-4 h-4 inline-block stroke-violet11 stroke-[0.5]" />
              <span className="font-medium">
                New Chat
              </span>
            </button>
          </div>
          <div>
            <button
              onClick={createChatFromTemplate}
              className="
                text-violet11
                hover:bg-mauve3 
                h-[35px]
                justify-center 
                rounded-[4px] 
                bg-violet6
                font-medium 
                leading-none  
                focus:outline-none
                px-2
                flex
                space-x-2
                items-center
              "
            >
              <StackIcon className="w-4 h-4 inline-block stroke-violet11 stroke-[0.5]" />
              <span className="font-medium">
                New from Template
              </span>
            </button>
          </div>
          <div>
            <button
              onClick={openSettings}
              className="
                text-violet11
                hover:bg-mauve3 
                h-[35px]
                justify-center 
                rounded-[4px] 
                bg-violet6
                font-medium 
                leading-none  
                focus:outline-none
                px-2
                flex
                space-x-2
                items-center
              "
            >
              <MixIcon className="w-4 h-4 inline-block stroke-violet11 stroke-[0.5]" />
              <span className="font-medium">
                Settings
              </span>
            </button>
          </div> */}
          <div className="flex-grow" />
          <div className="flex space-x-2 items-center">
            <Label.Root 
              className="tracking-tight text-base" 
              htmlFor="showArchived"
            >
              Show Archived
            </Label.Root>
            <Switch.Root
              id="showArchived"
              checked={showArchived}
              onCheckedChange={checked => setShowArchived(checked)}
              className="
                w-[42px] 
                h-[25px] 
                bg-blackA9 
                rounded-full 
                relative 
                shadow-[0_2px_10px] 
                shadow-blackA7 
                focus:shadow-[0_0_0_2px] 
                focus:shadow-black 
                data-[state=checked]:bg-black 
                outline-none 
                cursor-default
              "
            >
              <Switch.Thumb 
                className="
                  block 
                  w-[21px] 
                  h-[21px] 
                  bg-white 
                  rounded-full 
                  shadow-[0_2px_2px] 
                  shadow-blackA7 
                  transition-transform 
                  duration-100 
                  translate-x-0.5 
                  will-change-transform 
                  data-[state=checked]:translate-x-[19px]
                " 
              />
            </Switch.Root>
          </div>
        </div>

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
export default TemplateList;

