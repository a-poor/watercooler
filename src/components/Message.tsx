import { Box, Text, Badge, Divider } from '@mantine/core';

export enum Role {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export interface IMessageData {
  id: number;
  role: Role;
  content: string;
}

export interface IMessageProps { 
  message: IMessageData;
}

function Message({ message }: IMessageProps) {
  return (
    <Box my={10}>
      <Badge>
        { message.role }
      </Badge>
      <Text sx={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
        { message.content }
      </Text>
    </Box>
  );
}
export default Message;