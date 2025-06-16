import { Chatbox } from "@/components/chatbox";
import { Container } from "@/components/container";
import { SendForm } from "@/components/send-form";
import { Status } from "@/components/status";

export default function Home() {
  return (
    <div className="py-6 px-4 flex flex-col items-center gap-4 min-h-screen">
      <h1 className="text-2xl font-bold">VRC Browser Chat</h1>
      <div className="w-xl max-w-full">
        <Status />
      </div>
      <div className="w-xl max-w-full flex flex-col">
        <SendForm />
      </div>
      <div className="w-xl max-w-full flex flex-col">
        <Container className="flex-1 flex flex-col">
          <div className="h-full flex flex-col gap-2 justify-end">
            <Chatbox date={new Date()}>
              Hello, world! 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </Chatbox>
            <Chatbox date={new Date()}>Hello, world! 2</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 3</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 1</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 2</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 3</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 1</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 2</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 3</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 1</Chatbox>
            <Chatbox date={new Date()}>Hello, world! 2</Chatbox>
          </div>
        </Container>
      </div>
    </div>
  );
}
