import { useState } from "react";
import { Box, Textarea, ActionIcon, Tooltip } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

export interface IMessagePromptProps {
  onMessage?: (message: string) => void;
  loading?: boolean;
}

function MessagePrompt({ onMessage, loading }: IMessagePromptProps) {
  // Setup hooks for message state and sending messages...
  const [message, setMessage] = useState<string>("");
  const sendMessage = () => {
    message !== "" && onMessage?.(message);
    setMessage("");
  };
  return (
    <>
      <Box mr={10} mb={15} mt={10} sx={{ display: "flex" }}>
        <Textarea
          autosize
          minRows={1}
          maxRows={5}
          sx={{flexGrow: 1}}
          value={message} 
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.metaKey) {
              event.preventDefault();
              sendMessage();
            }
          }}
          onChange={(event) => setMessage(event.currentTarget.value)} 
        />
        <ActionIcon
          variant="light"
          color="blue"
          ml={5}
          sx={{height: "100%", minWidth: "50px"}} 
          loading={loading} 
          onClick={sendMessage}
        >
          <Tooltip label="Send Message">
            <IconSend size={20} />
          </Tooltip>
        </ActionIcon>
      </Box>
    </>
  );
}
export default MessagePrompt;
