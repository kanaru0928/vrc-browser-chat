import { Chatbox } from "@/components/chatbox";
import { Container } from "@/components/container";
import { Status } from "@/components/status";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function Home() {
  return (
    <div className="py-6 px-4 flex flex-col items-center gap-4 min-h-screen">
      <h1 className="text-2xl font-bold">VRC Browser Chat</h1>
      <div className="w-xl max-w-full">
        <Status />
      </div>
      <div className="w-xl max-w-full flex flex-col">
        <Container className="flex gap-2 items-end">
          <Textarea placeholder="Type your message here..." />
          <Button>
            <Send size={16} />
            Send
          </Button>
        </Container>
      </div>
      <div className="w-xl max-w-full flex">
        <Container className="flex-1">
          <ScrollArea className="h-96">
            <div className="h-full flex flex-col gap-2 justify-end">
              <Chatbox>Hello, world! 1</Chatbox>
              <Chatbox>Hello, world! 2</Chatbox>
              <Chatbox>Hello, world! 3</Chatbox>
              <Chatbox>Hello, world! 1</Chatbox>
              <Chatbox>Hello, world! 2</Chatbox>
              <Chatbox>Hello, world! 3</Chatbox>
              <Chatbox>Hello, world! 1</Chatbox>
              <Chatbox>Hello, world! 2</Chatbox>
              <Chatbox>Hello, world! 3</Chatbox>
              <Chatbox>Hello, world! 1</Chatbox>
              <Chatbox>Hello, world! 2</Chatbox>
              <Chatbox>Hello, world! 3</Chatbox>
            </div>
          </ScrollArea>
        </Container>
      </div>
    </div>
  );
}
