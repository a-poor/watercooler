import { useRef, useEffect } from "react";
import { Transition, ScrollArea, Divider } from '@mantine/core';
import Message, { IMessageData } from "./Message";

export interface IChatListProps {
  messages: IMessageData[];
}

function ChatList({ messages }: IChatListProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => viewport?.current?.scrollTo({ 
    top: viewport.current.scrollHeight, 
    behavior: 'smooth',
  });
  useEffect(() => scrollToBottom(), [messages]);
  return (
    <ScrollArea offsetScrollbars style={{flexGrow: 1}} viewportRef={viewport}>
      {messages.map((m, i) => (
        <div key={i}>
          {i > 0 && <Divider />}
          <Transition mounted={true} transition="fade" duration={400} timingFunction="ease">
            {(styles) => (
              <div style={styles}>
                <Message 
                  message={m} 
                />
              </div>
            )}
          </Transition>
        </div>
      ))}
    </ScrollArea>
  );
}
export default ChatList;
