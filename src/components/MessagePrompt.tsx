import { useState } from "react";
import { Box, Textarea, ActionIcon } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

export interface IMessagePromptProps {
  onMessage?: (message: string) => void;
  loading?: boolean;
}

function MessagePrompt({ onMessage, loading }: IMessagePromptProps) {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <Box mr={10} mb={15} mt={10} sx={{ display: "flex" }}>
        <Textarea
          autosize
          minRows={1}
          maxRows={5}
          sx={{flexGrow: 1}} 
          value={message} 
          onChange={(event) => setMessage(event.currentTarget.value)} 
        />
        <ActionIcon
          variant="light"
          color="blue"
          ml={5}
          sx={{height: "100%", minWidth: "50px"}} 
          loading={loading} 
          onClick={() => message !== "" && onMessage?.(message)}
        >
          <IconSend size={20} />
        </ActionIcon>
      </Box>
    </>
  );
}
export default MessagePrompt;
