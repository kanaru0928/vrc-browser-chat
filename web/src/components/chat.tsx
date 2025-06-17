"use client";

import { useState } from "react";
import { Chatbox } from "./chatbox";
import { Container } from "./container";
import { SendForm } from "./send-form";

interface Message {
  text: string;
  date: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const onSend = (text: string) => {
    setMessages((prev) => [{ text, date: new Date() }, ...prev]);
  };

  return (
    <>
      <SendForm onSend={onSend} />
      <Container className="flex-1 flex flex-col">
        <div className="h-full flex flex-col gap-2 justify-end">
          {messages.length === 0 ? (
            <Chatbox>
              <span className="text-primary-foreground/50">
                No messages yet. Start the conversation!
              </span>
            </Chatbox>
          ) : (
            messages.map((msg, index) => (
              <Chatbox key={index} date={msg.date}>
                {msg.text}
              </Chatbox>
            ))
          )}
        </div>
      </Container>
    </>
  );
}
