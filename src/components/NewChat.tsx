import { Box, Button, Title } from '@mantine/core';
import { IconMessagePlus } from '@tabler/icons-react';


export interface INewChatProps {
  onNewChat?: () => void;
}

function NewChat({ onNewChat }: INewChatProps) {
  return (
    <Box 
      sx={{ 
        width: "100%", 
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box 
        onClick={() => onNewChat?.()}
        px={25}
        py={25}
        style={{
          display: "flex", 
          flexDirection: "column", 
          backgroundColor: "rgba(200, 200, 200, 0.15)",
          borderRadius: "5px",
          cursor: "pointer",
          width: "max-content",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconMessagePlus size={28} stroke={1.5} />
        <Title order={5} mt={10}>
          Start a New Chat
        </Title>
      </Box>
    </Box>
  );
}
export default NewChat;
