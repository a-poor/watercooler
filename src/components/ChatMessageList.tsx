import ChatMessage from "@/components/ChatMessage";
import { UserRole } from "@/api";


const MESSAGES = [
  {
    id: '001',
    role: UserRole.System,
    content: 'You are a helpful assistant.',
  },
  {
    id: '002',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '003',
    role: UserRole.Function,
    content: 'Hello, world!\n\nThis is a test',
  },
  {
    id: '004',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
  {
    id: '005',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '006',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
  {
    id: '007',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '008',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
  {
    id: '009',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '010',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
  {
    id: '011',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '012',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
  {
    id: '013',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '014',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
  {
    id: '015',
    role: UserRole.User,
    content: 'Hello, world!',
  },
  {
    id: '016',
    role: UserRole.Assistant,
    content: 'Hello, world!',
  },
];

/**
 * A component that displays a list of chat messages or
 * an empty state if there are no messages.
 */
function ChatMessageList() {
  return (
    <div className="flex-grow relative">
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll">
        <div className="w-full h-4"/>
        {MESSAGES.map((message, i) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            darkBg={i % 2 === 0}
          />
        ))}
        <div className="w-full h-4"/>
      </div>
    </div>
  );
}
export default ChatMessageList;

