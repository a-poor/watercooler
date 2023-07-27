import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import UserIcon from '@/components/UserIcon';
import { UserRole, userRoleToTxt, userRoleFromTxt } from '@/api';

import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';


interface IMessageDropdownMenuProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

function MessageDropdownMenu({role, setRole}: IMessageDropdownMenuProps) {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Open menu"
          className="
            hover:bg-violet4
            color-mauve11 
            shadow-blackA7 
            flex 
            h-[35px] 
            w-[35px] 
            items-center 
            justify-center 
            rounded 
            text-base 
            leading-4 
            focus:shadow-[0_0_0_2px] 
            focus:shadow-black
          "
        >
          <DotsHorizontalIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="
            min-w-[220px] 
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
        >
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Copy Text
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Edit Text
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Delete Cell
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Duplicate Cell
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Insert Cell Above
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Insert Cell Below
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Move Cell Up
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="
              group 
              text-[13px] 
              leading-none 
              text-violet11 
              rounded-[3px] 
              flex 
              items-center 
              h-[25px] 
              px-[5px] 
              relative 
              pl-[25px] 
              select-none 
              outline-none 
              data-[disabled]:text-mauve8 
              data-[disabled]:pointer-events-none 
              data-[highlighted]:bg-violet9 
              data-[highlighted]:text-violet1
            "
          >
            Move Cell Down
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.CheckboxItem
            className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Skip Cell
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
              Set Message Role
              <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={2}
                alignOffset={-5}
              >
                {/* Select Message Role */}
                <DropdownMenu.Label className="pl-[25px] text-xs leading-[25px] text-mauve11">
                  Message Role
                </DropdownMenu.Label>
                <DropdownMenu.RadioGroup 
                  value={role} 
                  onValueChange={(s: string) => {
                    try {
                      const r = userRoleFromTxt(s);
                      setRole(r);
                    } catch (err) {
                      // Oh no! An error!
                      console.error(`Invalid UserRole value: "${s}". Defaulting to UserRole.User. Err: ${err}`);
                      setRole(UserRole.User);
                    }
                  }}
                >
                  {Object.values(UserRole).map((role, i) => (
                    <DropdownMenu.RadioItem
                      key={i}
                      value={role}
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
                        pl-[25px] 
                        select-none 
                        outline-none 
                        data-[disabled]:text-mauve8 
                        data-[disabled]:pointer-events-none 
                        data-[highlighted]:bg-violet9 
                        data-[highlighted]:text-violet1
                      "
                    >
                      <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                        <DotFilledIcon />
                      </DropdownMenu.ItemIndicator>
                      { userRoleToTxt(role) }
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>


          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}


export interface IChatMessageProps {
  /** Messaging user's role. */
  role: UserRole;

  /** Message content. */
  content: string;

  /** Whether the message should have a dark background. */
  darkBg?: boolean;
}

/**
 * A component that displays a single chat message.
 */
function ChatMessage({role, content, darkBg}: IChatMessageProps) {
  const [msgRole, setMsgRole] = useState(role);
  return (
    <div className={"" + (darkBg ? "bg-gray-100" : "")}>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex flex-row items-start space-x-4">
          <div>
            <UserIcon 
              role={role}
              tooltip={true}
            />
          </div>
          <div className="flex-grow break-all whitespace-pre-line">
            { content }
          </div>
          <div>
            <MessageDropdownMenu 
              role={msgRole}
              setRole={setMsgRole}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatMessage;

