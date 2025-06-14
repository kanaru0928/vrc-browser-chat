import { invokeCommand, oscSendChatboxCommand } from "@/lib/commands";
import { Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function ChatHistory() {
  const [text, setText] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    await invokeCommand(oscSendChatboxCommand, {
      text,
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold">Chat History</h2>
      <div className="flex flex-col">
        {/* <div className="flex-1 rounded-xl border border-input"></div> */}
        <div className="flex items-center gap-2">
          <Input onChange={handleTextChange} />
          <Button onClick={handleSend}>
            <Send size={16} />
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
