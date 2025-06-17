import "./App.css";
import { ChatHistory } from "./components/chat-history";
import { Container } from "./components/container";
import { OscSettings } from "./components/osc-settings";
import { ServerStatus } from "./components/server-status";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="bg-background min-h-screen p-4 flex flex-col gap-2">
        <Container className="space-y-4">
          <ServerStatus />
        </Container>
        <div className="flex gap-2 flex-1">
          <div className="flex-1 flex flex-col gap-2">
            <Container className="flex-1 space-y-4">
              <OscSettings />
            </Container>
            <Container className="py-2 px-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground space-y-1">
                <div>VRC Browser Chat</div>
                <div>&copy; 2025 kanaru</div>
              </div>
              <Button variant="ghost" className="cursor-pointer">
                v{import.meta.env.VITE_APP_VERSION}
              </Button>
            </Container>
          </div>
          <Container className="flex-1 space-y-4">
            <ChatHistory />
          </Container>
        </div>
      </main>
      <Toaster position="top-left" />
    </ThemeProvider>
  );
}

export default App;
