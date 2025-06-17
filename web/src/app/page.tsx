import { Chat } from "@/components/chat";
import { Status } from "@/components/status";

export default function Home() {
  return (
    <div className="py-6 px-4 flex flex-col items-center gap-4 min-h-screen">
      <div className="max-w-xl w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">VRC Browser Chat</h1>
        <div>
          <Status />
        </div>
        <Chat />
      </div>
    </div>
  );
}
