import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";


export interface IChatInputProps {
  onSubmit: (message: string) => void;
}

/**
 * A component that allows the user to input a message
 * and send it to the chat.
 */
function ChatInput({onSubmit}: IChatInputProps) {
  const [value, setValue] = useState("");
  return (
    <div className="">
      <div className="max-w-3xl mx-auto py-4 px-1 relative">
        <label for="message" class="sr-only">Enter a message</label>
        <textarea 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          name="message" 
          id="message" 
          placeholder="Enter a message..."
          className="
            block
            w-full
            resize-none
            border-1
            border-gray-300
            rounded-lg
            bg-transparent
            py-1.5
            text-gray-900
            placeholder:text-gray-400
            focus:ring-0
            sm:text-sm
            sm:leading-6
            pr-11
          "
        />
        <button
          type="submit"
          disabled={value.length === 0}
          onClick={e => onSubmit(value)}
          className="
            absolute
            right-2
            bottom-6
            rounded-lg
            bg-blue-500
            hover:bg-blue-400
            disabled:bg-gray-400
            active:bg-blue-600
            text-white
            w-8
            h-8
          "
        >
          <PaperPlaneIcon className="w-5 h-5 mx-auto my-auto" />
        </button>
      </div>
    </div>
  );
}
export default ChatInput;

