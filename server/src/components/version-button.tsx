import { useAppVersion } from "@/hooks/use-app-version";
import { useState } from "react";
import { toast } from "sonner";
import {
  checkForUpdatesCommand,
  installUpdateCommand,
  invokeCommand,
} from "../lib/commands";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function VersionButton() {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<
    "checking" | "available" | "none" | "installing" | null
  >(null);

  const handleVersionClick = async () => {
    setIsUpdateDialogOpen(true);
    setUpdateStatus("checking");

    try {
      const hasUpdate = await invokeCommand(checkForUpdatesCommand, {});
      setUpdateStatus(hasUpdate ? "available" : "none");
    } catch (error) {
      console.error("Update check failed:", error);
      toast.error("アップデートの確認に失敗しました", {
        action: {
          label: "Close",
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
      toast.success(
        "アップデートがインストールされました。アプリを再起動してください。",
        {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        }
      );
    } catch (error) {
      console.error("Update installation failed:", error);
      toast.error("アップデートのインストールに失敗しました", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      setUpdateStatus("available");
    }
  };

  const { appVersion } = useAppVersion();

  return (
    <>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={handleVersionClick}
      >
        v{appVersion}
      </Button>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アップデート確認</DialogTitle>
            <DialogDescription>
              現在のバージョン: v{appVersion}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {updateStatus === "checking" && (
              <Alert>
                <AlertDescription>アップデートを確認中...</AlertDescription>
              </Alert>
            )}

            {updateStatus === "available" && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    新しいアップデートが利用可能です。
                  </AlertDescription>
                </Alert>
                <div className="flex gap-2">
                  <Button onClick={handleInstallUpdate}>アップデート</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsUpdateDialogOpen(false)}
                  >
                    後で
                  </Button>
                </div>
              </div>
            )}

            {updateStatus === "none" && (
              <Alert>
                <AlertDescription>
                  最新バージョンを使用しています。
                </AlertDescription>
              </Alert>
            )}

            {updateStatus === "installing" && (
              <Alert>
                <AlertDescription>
                  アップデートをインストール中...
                </AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
