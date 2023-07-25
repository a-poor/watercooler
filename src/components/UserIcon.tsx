import { UserRole } from '@/api';

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

export interface IUserIconProps {
  role: UserRole;
}

function UserIcon({role}: IUserIconProps) {
  const color = USER_ROLE_COLORS[role];
  const initials = USER_ROLE_INITIALS[role];
  return (
    <span className={"inline-flex h-10 w-10 items-center justify-center rounded-full "+color}>
      <span className="font-medium leading-none text-white text-lg">
        { initials }
      </span>
    </span>
  );
}
export default UserIcon;

