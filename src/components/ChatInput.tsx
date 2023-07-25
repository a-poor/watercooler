import { useState } from "react";

/**
 * A component that allows the user to input a message
 * and send it to the chat.
 */
function ChatInput() {
  const [value, setValue] = useState("");
  return (
    <div className="">
      <div className="max-w-3xl mx-auto py-4">
        {/* <label for="comment" class="sr-only">Add your comment</label> */}
        <textarea 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
          name="message" 
          id="message" 
          placeholder="Enter a message..."
          className="
            block 
            w-full 
            resize-none 
            border-0 
            bg-transparent 
            py-1.5 
            text-gray-900 
            placeholder:text-gray-400 
            focus:ring-0 
            sm:text-sm 
            sm:leading-6
          "
        />
      </div>
    </div>
  );
}
export default ChatInput;

