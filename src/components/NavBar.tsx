import { ReactNode } from 'react';
import * as RadixToggle from '@radix-ui/react-toggle';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ChatBubbleIcon, Component1Icon, CodeIcon, MixerVerticalIcon } from '@radix-ui/react-icons';


export interface IToggleProps {
  /** Child components (e.g. an icon) */
  children: ReactNode;

  /** Is the toggle active? */
  active: boolean; 

  /** Action to run when toggled. */
  onToggle: (v: boolean) => void;

  /** Aria label for the toggle. */
  ariaLabel?: string;

  /** Tooltip text. */
  tooltip?: string;
}

export function Toggle({ children, active, onToggle, ariaLabel, tooltip }: IToggleProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div>
          <RadixToggle.Root
            pressed={active}
            onPressedChange={onToggle}
            className="
              hover:bg-violet3 
              color-mauve11 
              data-[state=on]:bg-violet6 
              data-[state=on]:text-violet12 
              flex 
              h-[45px] 
              w-[45px] 
              items-center 
              justify-center 
              rounded 
              bg-white 
              text-base 
              leading-4
              my-1
              mx-2
            " 
            aria-label={ariaLabel}
          >
            { children }
          </RadixToggle.Root>
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
          side="right"
          sideOffset={1}
        >
          { tooltip }
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/** IDs of the nav bar tabs. */
export type NavBarTabs = 'chat' | 'templates' | 'code' | 'settings';

export interface INavBarProps {
  /** Which tab is active? */
  activeTab: NavBarTabs;

  /** Set the active tab by ID. */
  setActiveTab: (value: NavBarTabs) => void;
}

/**
 * The nav-bar for the left-hand side of the app.
 */
function NavBar({activeTab, setActiveTab}: INavBarProps) {
  return (
    <div className="flex flex-col mb-2">
      <Toggle 
        active={activeTab === 'chat'} 
        onToggle={() => setActiveTab('chat')}
        ariaLabel='Open Chat'
        tooltip='Chat'
      >
        <ChatBubbleIcon className="w-5 h-5" />
      </Toggle>
      <Toggle 
        active={activeTab === 'templates'} 
        onToggle={() => setActiveTab('templates')}
        ariaLabel='Open Templates'
        tooltip='Templates'
      >
        <Component1Icon className="w-5 h-5" />
      </Toggle>
      <Toggle 
        active={activeTab === 'code'} 
        onToggle={() => setActiveTab('code')}
        ariaLabel='Open Code'
        tooltip='Code'
      >
        <CodeIcon className="w-5 h-5" />
      </Toggle>
      <div className="flex-grow"/>
      <Toggle 
        active={activeTab === 'settings'} 
        onToggle={() => setActiveTab('settings')}
        ariaLabel='Open Settings'
        tooltip='Settings'
      >
        <MixerVerticalIcon className="w-5 h-5" />
      </Toggle>
    </div>
  );
}
export default NavBar;

