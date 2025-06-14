import "./App.css";
import { Container } from "./components/container";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  return (
    <ThemeProvider>
      <main className="bg-background min-h-screen p-4">
        <Container className="flex items-center justify-between">
          <h1 className="text-xl font-bold">VRC Browser Chat Server</h1>
          <Button>
            Restart
          </Button>
        </Container>
        
      </main>
    </ThemeProvider>
  );
}

export default App;
