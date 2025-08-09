import { useState } from "react";
import { useAppVersion } from "@/hooks/use-app-version";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import { ExternalLink, Languages } from "lucide-react";
import {
  checkForUpdatesCommand,
  installUpdateCommand,
  invokeCommand,
} from "../lib/commands";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LicenseText } from "@/lib/constants";
import { getUserStore } from "@/lib/store";

interface AppInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppInfoDialog({ open, onOpenChange }: AppInfoDialogProps) {
  const { t, i18n } = useTranslation();
  const [updateStatus, setUpdateStatus] = useState<
    "checking" | "available" | "none" | "installing" | null
  >(null);
  const { appVersion } = useAppVersion();

  const handleCheckUpdate = async () => {
    setUpdateStatus("checking");

    try {
      const hasUpdate = await invokeCommand(checkForUpdatesCommand, {});
      setUpdateStatus(hasUpdate ? "available" : "none");
    } catch (error) {
      console.error("Update check failed:", error);
      toast.error(t("updateCheckFailed"), {
        action: {
          label: t("close"),
          onClick: () => toast.dismiss(),
        },
      });
      setUpdateStatus("none");
    }
  };

  const handleInstallUpdate = async () => {
    setUpdateStatus("installing");

    try {
      await invokeCommand(installUpdateCommand, {});
      toast.success(t("updateInstalled"), {
        action: {
          label: t("close"),
          onClick: () => toast.dismiss(),
        },
      });
    } catch (error) {
      console.error("Update installation failed:", error);
      toast.error(t("updateInstallFailed"), {
        action: {
          label: t("close"),
          onClick: () => toast.dismiss(),
        },
      });
      setUpdateStatus("available");
    }
  };

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    getUserStore().then((store) => {
      store.set("language", value);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("appInfo")}</DialogTitle>
          <DialogDescription>{t("appInfoDescription")}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">{t("info")}</TabsTrigger>
            <TabsTrigger value="update">{t("update")}</TabsTrigger>
            <TabsTrigger value="terms">{t("termsOfUse")}</TabsTrigger>
            <TabsTrigger value="license">{t("license")}</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <ScrollArea className="h-80 w-full">
              <div className="space-y-4 p-1">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">VRC Browser Chat</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("version")} {appVersion}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("copyright")}
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <p className="text-sm">{t("appDescription")}</p>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <a
                        href="https://github.com/kanaru0928/vrc-browser-chat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        {t("viewOnGitHub")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="update">
            <ScrollArea className="h-80 w-full">
              <div className="space-y-4 p-1">
                <p className="text-sm text-muted-foreground">
                  {t("currentVersion")}: v{appVersion}
                </p>

                <Button
                  onClick={handleCheckUpdate}
                  disabled={
                    updateStatus === "checking" || updateStatus === "installing"
                  }
                >
                  {t("checkForUpdates")}
                </Button>

                {updateStatus === "checking" && (
                  <Alert>
                    <AlertDescription>
                      {t("checkingForUpdates")}
                    </AlertDescription>
                  </Alert>
                )}

                {updateStatus === "available" && (
                  <div className="space-y-4">
                    <Alert>
                      <AlertDescription>
                        {t("newUpdateAvailableDialog")}
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-2">
                      <Button onClick={handleInstallUpdate}>
                        {t("updateApp")}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setUpdateStatus(null)}
                      >
                        {t("later")}
                      </Button>
                    </div>
                  </div>
                )}

                {updateStatus === "none" && (
                  <Alert>
                    <AlertDescription>
                      {t("usingLatestVersion")}
                    </AlertDescription>
                  </Alert>
                )}

                {updateStatus === "installing" && (
                  <Alert>
                    <AlertDescription>{t("installingUpdate")}</AlertDescription>
                  </Alert>
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="terms">
            <ScrollArea className="h-80 w-full rounded-md border p-4">
              <div className="text-sm whitespace-pre-wrap">
                {t("termsOfUseContent")}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="license">
            <ScrollArea className="h-80 w-full rounded-md border p-4">
              <div className="text-sm whitespace-pre-wrap font-mono">
                {LicenseText}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">{t("language")}:</label>
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  <Languages size={16} />
                  {t("english")}
                </SelectItem>
                <SelectItem value="ja">
                  <Languages size={16} />
                  {t("japanese")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
