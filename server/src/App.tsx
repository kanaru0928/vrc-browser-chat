import "./App.css";
import { ChatHistory } from "./components/chat-history";
import { Container } from "./components/container";
import { OscSettings } from "./components/osc-settings";
import { ServerStatus } from "./components/server-status";
import { ThemeProvider } from "./components/theme-provider";
import { AppInfoButton } from "./components/app-info-button";
import { Toaster } from "./components/ui/sonner";
import { useAppVersion } from "./hooks/use-app-version";
import { useStartupUpdateCheck } from "./hooks/use-startup-update-check";
import { toast } from "sonner";

function App() {
  const { appVersion } = useAppVersion();
  
  useStartupUpdateCheck({
    onUpdateAvailable: () => {
      toast.info("新しいアップデートが利用可能です", {
        description: "アプリ情報ボタンから更新できます",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: (error) => {
      console.error("Startup update check failed:", error);
    },
  });

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
                <div>VRC Browser Chat v{appVersion}</div>
                <div>&copy; 2025 kanaru</div>
              </div>
              <AppInfoButton />
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
