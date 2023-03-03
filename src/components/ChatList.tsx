import { Box, ScrollArea, Text } from '@mantine/core';

export enum Role {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export interface IMessage {
  id: number;
  role: Role;
  content: string;
}

export interface IChatListProps {
  messages: IMessage[];
}

function ChatList({ messages }: IChatListProps) {
  return (
    <Box>
      <ScrollArea>
        {messages.map(m => (
          <Box key={m.id}>
            <Text>
              { m.content }
            </Text>
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
}
export default ChatList;
