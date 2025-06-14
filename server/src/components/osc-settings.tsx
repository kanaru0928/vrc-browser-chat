import { number, ValidationError } from "yup";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Play, Square } from "lucide-react";
import {
  invokeCommand,
  oscConnectCommand,
  oscDisconnectCommand,
} from "@/lib/commands";

export function OscSettings() {
  const portSchema = number()
    .required("Port is required")
    .typeError("Port must be a number")
    .min(1, "Port must be greater than 0")
    .max(65535, "Port must be less than or equal to 65535");

  const [sendingPort, setSendingPort] = useState<number>(9000);
  const [sendingPortError, setSendingPortError] = useState<string | null>(null);

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

    const result = await invokeCommand(oscConnectCommand, {
      address: "127.0.0.1",
      port: sendingPort,
    });
    
    console.log("OSC connection result:", result);
  };

  const handleStopClick = () => {
    const result = invokeCommand(oscDisconnectCommand, {});
    console.log("OSC disconnection result:", result);
  };

  return (
    <>
      <h2 className="text-xl font-bold">OSC</h2>
      <div className="space-y-2">
        <h3 className="font-semibold">Sending</h3>
        <div>
          <div className="flex items-baseline gap-2">
            <label className="block text-sm mb-1">Port</label>
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
            className="flex-1 bg-emerald-300 hover:bg-emerald-300/90"
            disabled={!!sendingPortError}
            onClick={handleStartClick}
          >
            <Play className="fill-current" strokeWidth={0} />
            Start
          </Button>
          <Button
            className="flex-1 bg-destructive hover:bg-destructive/90"
            disabled={!!sendingPortError}
            onClick={handleStopClick}
          >
            <Square className="fill-current" strokeWidth={0} />
            Stop
          </Button>
        </div>
      </div>
    </>
  );
}
