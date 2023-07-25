import { Ref } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { UserRole, userRoleToTxt } from '@/api';

export const USER_ROLE_COLORS = {
  [UserRole.User]: 'bg-fuchsia-500',
  [UserRole.Assistant]: 'bg-green-500',
  [UserRole.System]: 'bg-gray-500',
  [UserRole.Function]: 'bg-blue-500',
};

export const USER_ROLE_INITIALS = {
  [UserRole.User]: 'U',
  [UserRole.Assistant]: 'A',
  [UserRole.System]: 'S',
  [UserRole.Function]: 'F',
};

export function UserIconContents({role}: {role: UserRole}) {
  const color = USER_ROLE_COLORS[role];
  const initials = USER_ROLE_INITIALS[role];
  return (
    <span className={"inline-flex h-8 w-8 items-center justify-center rounded-full "+color}>
      <span className="font-medium leading-none text-white text-lg">
        { initials }
      </span>
    </span>
  );
}

export interface IUserIconProps {
  role: UserRole;
  tooltip?: boolean;
}

function UserIcon({role, tooltip}: IUserIconProps) {
  if (!tooltip) {
    return <UserIconContents role={role}/>;
  }
  return (
    <Tooltip.Root delayDuration={1000}>
      <Tooltip.Trigger asChild>
        <div>
          <UserIconContents role={role}/>
        </div>
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
          { userRoleToTxt(role) }
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
export default UserIcon;

