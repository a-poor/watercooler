import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import { PlusIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

import type { IChat } from '@/api';


const dummyChats: IChat[] = [
  {
    id: "01",
    name: "Rust vs Go vs JavaScript",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: false,
  },
  {
    id: "02",
    name: "Single table design",
    createdAt: "2023-07-20",
    updatedAt: "2023-07-20",
    archived: true,
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


/**
 * A component that displays a list of chats, archived chats,
 * and a button to create a new chat.
 */
function ChatList() {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [chats, setChats] = useState<IChat[]>(dummyChats);
  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <h1 className="font-semibold text-3xl mb-4">
          Your Chats
        </h1>
        
        {/* Button to create a new chat or show archived chats. */}
        <div className="flex flex-row items-center mb-6">
          <div className="">
            <button 
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
        <div className="scroll-y-auto">
          <ul className="flex flex-col space-y-2">
            {chats
              .filter(c => showArchived || !c.archived)
              .map(c => (
                <li key={c.id} className="flex flex-row hover:bg-slate-100 rounded-lg px-3 py-2">
                  <button className="flex-grow text-left">
                    {!c.archived && (
                      <span>{ c.name }</span>
                    )}
                    {c.archived && (
                      <span className="line-through text-slate-500">
                        { c.name }
                      </span>
                    )}
                  </button>
                  <button className="hover:bg-slate-200 px-1 py-1 rounded-md">
                    <DotsHorizontalIcon className="w-5 h-5"/>
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ChatList;

