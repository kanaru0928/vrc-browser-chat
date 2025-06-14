import "./App.css";
import { ChatHistory } from "./components/chat-history";
import { Container } from "./components/container";
import { OscSettings } from "./components/osc-settings";
import { ServerStatus } from "./components/server-status";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <main className="bg-background min-h-screen p-4 space-y-2">
        <Container className="space-y-4">
          <ServerStatus />
        </Container>
        <div className="flex gap-2">
          <Container className="flex-1 space-y-4">
            <OscSettings />
          </Container>
          <Container className="flex-1 space-y-4">
            <ChatHistory />
          </Container>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
