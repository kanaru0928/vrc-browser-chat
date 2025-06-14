import "./App.css";
import { Container } from "./components/container";
import { ServerStatus } from "./components/server-status";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <main className="bg-background min-h-screen p-4">
        <Container className="space-y-4 p-5">
          <ServerStatus />
        </Container>
        <div>
          
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
