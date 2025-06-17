import { useListenEvent } from "@/hooks/use-listen-event";
import {
  invokeCommand,
  webStartServerCommand
} from "@/lib/commands";
import { CheckCircle2, Copy, ExternalLink, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ServerRestartForm } from "./server-restart-form";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function ServerStatus() {
  const [serverUrl, setServerUrl] = useState<string | null>(null);

  useListenEvent("server-status-updated", (event: { url: string }) => {
    console.log("Server URL updated:", event.url);
    setServerUrl(event.url);
  });

  const handleCopyClick = async () => {
    if (serverUrl) {
      await navigator.clipboard.writeText(serverUrl);
    }
  };

  useEffect(() => {
    invokeCommand(webStartServerCommand, {});
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">Web Status</h2>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          {!serverUrl ? (
            <Alert variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Server is down
            </Alert>
          ) : (
            <Alert className="text-emerald-300">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Server is up
            </Alert>
          )}

          <h3 className="text-sm font-semibold">Web URL</h3>
          <div className="flex items-center gap-2">
            <p className="py-2 px-3 rounded-md border border-input text-sm flex-1">
              {serverUrl || "Web server is down"}
            </p>
            <Button
              variant="outline"
              asChild={!!serverUrl}
              disabled={!serverUrl}
            >
              {serverUrl ? (
                <a href={serverUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Open
                </a>
              ) : (
                <>
                  <ExternalLink size={16} />
                  Open
                </>
              )}
            </Button>
            <Button
              variant="outline"
              disabled={!serverUrl}
              onClick={handleCopyClick}
            >
              <Copy size={16} />
              Copy
            </Button>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="w-52">
          <ServerRestartForm />
        </div>
      </div>
    </>
  );
}
