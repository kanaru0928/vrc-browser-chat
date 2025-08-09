import { useListenEvent } from "@/hooks/use-listen-event";
import {
  invokeCommand,
  oscConnectCommand,
  oscDisconnectCommand,
} from "@/lib/commands";
import {
  CheckCircle2,
  CircleX,
  LoaderCircle,
  Play,
  Square,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { number, ValidationError } from "yup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "react-i18next";

export function OscSettings() {
  const { t } = useTranslation();
  const portSchema = number()
    .required(t("portRequired"))
    .typeError(t("portMustBeNumber"))
    .min(1, t("portGreaterThanZero"))
    .max(65535, t("portLessThanMax"));

  const [sendingPort, setSendingPort] = useState<number>(9000);
  const [sendingPortError, setSendingPortError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnectionLoading, setIsConnectionLoading] =
    useState<boolean>(false);

  useListenEvent("osc-updated", (event: { status: string }) => {
    setIsConnected(event.status === "Connected");
    setIsConnectionLoading(false);
  });

  const handleSendingPortChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const value = portSchema.validateSync(e.target.value);
      setSendingPort(value);
      setSendingPortError(null);
    } catch (error) {
      if (error instanceof ValidationError) {
        setSendingPortError(error.message);
      }
    }
  };

  const handleStartClick = async () => {
    if (sendingPortError) {
      return;
    }

    setIsConnectionLoading(true);

    const result = await invokeCommand(oscConnectCommand, {
      address: "127.0.0.1",
      port: sendingPort,
    });

    console.log("OSC connection result:", result);
  };

  const handleStopClick = () => {
    const result = invokeCommand(oscDisconnectCommand, {});
    console.log("OSC disconnection result:", result);
    setIsConnectionLoading(true);
  };

  return (
    <>
      <h2 className="text-xl font-bold">{t("osc")}</h2>
      <div className="space-y-2">
        <h3 className="font-semibold">{t("send")}</h3>
        {isConnectionLoading ? (
          <Alert>
            <LoaderCircle size={16} className="animate-spin" />
            <Skeleton className="w-24 h-4 my-0.5" />
          </Alert>
        ) : isConnected ? (
          <Alert className="text-emerald-300">
            <CheckCircle2 size={16} />
            {t("connected")}
          </Alert>
        ) : (
          <Alert variant="destructive">
            <CircleX size={16} />
            {t("notConnected")}
          </Alert>
        )}
        <div>
          <div className="flex items-baseline gap-2">
            <label className="block text-sm mb-1">{t("port")}</label>
            <div className="flex-1">
              <Input
                defaultValue={sendingPort}
                onChange={handleSendingPortChange}
                placeholder="9000"
              />
              {sendingPortError && (
                <p className="text-destructive text-sm">{sendingPortError}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-emerald-300 hover:bg-emerald-300/90 cursor-pointer"
            disabled={!!sendingPortError || isConnected || isConnectionLoading}
            onClick={handleStartClick}
          >
            <Play className="fill-current" strokeWidth={0} />
            {t("start")}
          </Button>
          <Button
            className="flex-1 bg-destructive hover:bg-destructive/90 cursor-pointer"
            disabled={!!sendingPortError || !isConnected || isConnectionLoading}
            onClick={handleStopClick}
          >
            <Square className="fill-current" strokeWidth={0} />
            {t("stop")}
          </Button>
        </div>
      </div>
    </>
  );
}
