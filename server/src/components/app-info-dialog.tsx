import { useState } from "react";
import { useAppVersion } from "@/hooks/use-app-version";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import {
  checkForUpdatesCommand,
  installUpdateCommand,
  invokeCommand,
} from "../lib/commands";

const TERMS_OF_USE_JA = `# 利用規約

## 1. はじめに

本利用規約（以下「本規約」）は、VRC Browser Chat（以下「本ソフトウェア」）の利用に関する条件を定めるものです。本ソフトウェアをダウンロード、インストール、または使用することにより、お客様は本規約に同意したものとみなされます。

## 2. 使用目的

本ソフトウェアは、VRChat と Web ブラウザ間でのチャット通信を可能にすることを目的として開発されています。

## 3. 禁止事項

お客様は本ソフトウェアを以下の目的で使用することはできません。

- VRChat の利用規約に違反する行為
- 改変の有無に関わらず、本ソフトウェアのライセンスに違反して再頒布する行為
- スパム、嫌がらせ、または迷惑行為
- 他のユーザーに害を与える可能性のある行為
- 本ソフトウェアの機能を悪用した不正行為

## 4. 免責事項

本ソフトウェアは「現状のまま」で提供され、いかなる保証もありません。本ソフトウェアの使用に起因する損害（データ損失、アカウントへの影響、第三者との紛争等）について、開発者は一切の責任を負いません。

## 5. サポート

本ソフトウェアに関するサポートは、GitHub リポジトリの Issues ページを通じて提供されます。開発者はサポートを提供する義務を負いませんが、可能な限り協力いたします。

## 6. 更新とメンテナンス

開発者は予告なく本ソフトウェアの更新、修正、または提供の終了を行う権利を留保します。

## 7. ライセンス

本ソフトウェアは、GNU General Public License v3.0の下でライセンスされています。

## 8. 規約の変更

本規約は予告なく変更される場合があります。変更後の規約は、本ファイルの更新によって効力を発します。継続してソフトウェアを使用することにより、変更後の規約に同意したものとみなされます。

## 9. 準拠法

本規約は日本国法に準拠し、解釈されるものとします。

## 10. 言語について

本規約の他言語版が提供されている場合でも、日本語版と他言語版の間に矛盾がある場合は、日本語版が優先されるものとします。

## 11. 連絡先

本規約に関するご質問は、GitHub リポジトリの Issues ページにてお問い合わせください。`;

const LICENSE_TEXT = `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.`;

interface AppInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppInfoDialog({ open, onOpenChange }: AppInfoDialogProps) {
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


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>アプリ情報</DialogTitle>
          <DialogDescription>
            VRC Browser Chat の詳細情報
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">情報</TabsTrigger>
            <TabsTrigger value="update">アップデート</TabsTrigger>
            <TabsTrigger value="terms">利用規約</TabsTrigger>
            <TabsTrigger value="license">ライセンス</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <ScrollArea className="h-96 w-full">
              <div className="space-y-4 p-1">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">VRC Browser Chat</h3>
                  <p className="text-sm text-muted-foreground">バージョン {appVersion}</p>
                  <p className="text-sm text-muted-foreground">&copy; 2025 kanaru</p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <p className="text-sm">
                    VRChat と Web ブラウザ間でのチャット通信を可能にするアプリケーションです。
                  </p>
                  <div className="flex justify-center">
                    <Button variant="outline" asChild>
                      <a 
                        href="https://github.com/kanaru0928/vrc-browser-chat" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        GitHub で見る
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="update">
            <ScrollArea className="h-96 w-full">
              <div className="space-y-4 p-1">
                <p className="text-sm text-muted-foreground">
                  現在のバージョン: v{appVersion}
                </p>
                
                <Button onClick={handleCheckUpdate} disabled={updateStatus === "checking" || updateStatus === "installing"}>
                  アップデート確認
                </Button>
                
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
                        onClick={() => setUpdateStatus(null)}
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
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="terms">
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="text-sm whitespace-pre-wrap">
                {TERMS_OF_USE_JA}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="license">
            <ScrollArea className="h-96 w-full rounded-md border p-4">
              <div className="text-sm whitespace-pre-wrap font-mono">
                {LICENSE_TEXT}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}