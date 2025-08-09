import { useListenEvent } from "@/hooks/use-listen-event";
import { invokeCommand, webStartServerCommand } from "@/lib/commands";
import { CheckCircle2, Copy, ExternalLink, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ServerRestartForm } from "./server-restart-form";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function ServerStatus() {
  const { t } = useTranslation();
  const [serverUrl, setServerUrl] = useState<string | null>(null);

  useListenEvent("server-status-updated", (event: { url: string }) => {
    console.log("Server URL updated:", event.url);
    setServerUrl(event.url);
  });

  useListenEvent("server-error", (event: { error: string }) => {
    toast.error(`${t("serverError")}: ${event.error}`, {
      action: {
        label: t("close"),
        onClick: () => toast.dismiss(),
      },
    });
    setServerUrl(null);
  });

  const handleCopyClick = async () => {
    if (serverUrl) {
      await navigator.clipboard.writeText(serverUrl);
      toast.success(t("serverUrlCopied"), {
        action: {
          label: t("close"),
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  useEffect(() => {
    invokeCommand(webStartServerCommand, {
      port: 11087,
    }).then((result) => {
      if (result?.url) {
        setServerUrl(result.url);
      }
    });
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">{t("webStatus")}</h2>
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          {!serverUrl ? (
            <Alert variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              {t("serverIsDown")}
            </Alert>
          ) : (
            <Alert className="text-emerald-300">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {t("serverIsUp")}
            </Alert>
          )}

          <h3 className="text-sm font-semibold">{t("webUrl")}</h3>
          <div className="flex items-center gap-2">
            <p className="py-2 px-3 rounded-md border border-input text-sm flex-1">
              {serverUrl || t("webServerIsDown")}
            </p>
            <Button
              variant="outline"
              asChild={!!serverUrl}
              disabled={!serverUrl}
            >
              {serverUrl ? (
                <a href={serverUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  {t("open")}
                </a>
              ) : (
                <>
                  <ExternalLink size={16} />
                  {t("open")}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              disabled={!serverUrl}
              onClick={handleCopyClick}
              className="cursor-pointer"
            >
              <Copy size={16} />
              {t("copy")}
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
