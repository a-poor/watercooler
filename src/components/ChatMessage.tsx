import UserIcon from '@/components/UserIcon';
import { UserRole } from '@/api';


export interface IChatMessageProps {
  role: UserRole;
  content: string;
  darkBg?: boolean;
}

/**
 * A component that displays a single chat message.
 */
function ChatMessage({role, content, darkBg}: IChatMessageProps) {
  return (
    <div className={"" + (darkBg ? "bg-gray-50" : "")}>
      <div className="max-w-3xl mx-auto py-4">
        <div className="flex flex-row items-start space-x-4">
          <div>
            <UserIcon role={role} />
          </div>
          <div className="flex-grow">
            { content.split('\n').map((line, i) => (
              <div key={i} className="mb-1">
                { line }
              </div>
            ))   }
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatMessage;

