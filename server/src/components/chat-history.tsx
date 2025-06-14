import { invokeCommand, oscSendChatboxCommand } from "@/lib/commands";
import { listen } from "@tauri-apps/api/event";
import { Send } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ChatHistory() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = async (text: string) => {
    await invokeCommand(oscSendChatboxCommand, {
      text,
    });
    setHistory((prev) => [...prev, text]);
    setText(""); // 送信後にテキストエリアを空にする
  };

  useEffect(() => {
    let already_unmounted = false;
    let unlisten = () => {};
    (async () => {
      const unlistenEvent = await listen<{ text: string }>(
        "chatbox",
        (event) => {
          setText(event.payload.text);
          handleSend(event.payload.text);
        }
      );
      
      if (!already_unmounted) {
        unlisten = unlistenEvent;
      } else {
        unlistenEvent();
      }
    })();

    return () => {
      already_unmounted = true;
      unlisten();
    };
  }, []);

  return (
    <div className="flex flex-col h-full space-y-4">
      <h2 className="text-xl font-bold">Chat History</h2>
      <div className="flex flex-col h-full gap-2">
        <div className="flex-1 rounded-lg border border-input min-h-10">
          {history.length > 0 ? (
            <ul className="p-2 space-y-1">
              {history.map((msg, index) => (
                <li key={index} className="text-sm">
                  {msg}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-sm text-muted-foreground">
              No messages yet.
            </div>
          )}
        </div>
        <div className="flex items-end gap-2">
          <Textarea
            onChange={handleTextChange}
            value={text} // テキストエリアの値をstateにバインド
            className="resize-none max-h-5 h-5"
          />
          <Button onClick={() => handleSend(text)} disabled={!text.trim()}>
            <Send size={16} />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
