import { Box } from '@mantine/core';
import ChatList from "./ChatList";
import { IMessageData } from "./Message";
import MessagePrompt from "./MessagePrompt";

export interface IChatProps {
  messages: IMessageData[];
  onMessage?: (message: string) => void;
  chatLoading?: boolean;
}

function Chat({messages, onMessage, chatLoading}: IChatProps) {
  return (
    <Box style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <ChatList messages={messages} />
      <MessagePrompt onMessage={onMessage} loading={chatLoading} />
    </Box>
  );
}
export default Chat;
