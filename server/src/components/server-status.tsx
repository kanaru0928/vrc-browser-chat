import { CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ServerRestartForm } from "./server-restart-form";

export function ServerStatus() {
  return (
    <>
      <h2 className="text-xl font-bold">Server Status</h2>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <Alert className="text-emerald-300">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Server is running
          </Alert>
          <h3 className="text-sm font-semibold">Server URL</h3>
          <div className="flex items-center gap-2">
            <p className="py-2 px-3 rounded-md border border-accent text-sm flex-1">
              http://localhost:11087
            </p>
            <Button variant="outline" asChild>
              <a
                href="http://localhost:11087"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} />
                Open
              </a>
            </Button>
            <Button variant="outline">
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
