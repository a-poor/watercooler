
export interface IChatSettingsProps {
  onBack?: () => void;
}

/**
 * A component that displays the top-level settings
 * associated with a chat application.
 */
function ChatSettings({onBack}: IChatSettingsProps) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <h1 className="font-semibold text-3xl mb-6 line-clamp-1">
          Chat Settings
        </h1>
        <div className="">
          <button 
            onClick={onBack}
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
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default ChatSettings;

