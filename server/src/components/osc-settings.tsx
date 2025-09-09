import { useListenEvent } from "@/hooks/use-listen-event";
import {
  invokeCommand,
  oscConnectCommand,
  oscDisconnectCommand,
  scanNetworkCommand,
} from "@/lib/commands";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CheckCircle2,
  CircleX,
  LoaderCircle,
  Play,
  Square
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InferType, number, object, string } from "yup";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

interface DeviceInfo {
  ip: string;
  name: string;
}

export function OscSettings() {
  const addressSchema = object({
    address: string().required("Address is required"),
    port: number()
      .typeError("Port must be a number")
      .required("Port is required")
      .min(1, "Port must be greater than 0")
      .max(65535, "Port must be less than or equal to 65535"),
  });

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnectionLoading, setIsConnectionLoading] =
    useState<boolean>(false);
  const [networkDevices, setNetworkDevices] = useState<DeviceInfo[]>([]);

  const form = useForm<InferType<typeof addressSchema>>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      address: "127.0.0.1",
      port: 9000,
    },
    mode: "onChange",
  });

  useListenEvent("osc-updated", (event: { status: string }) => {
    setIsConnected(event.status === "Connected");
    setIsConnectionLoading(false);
  });

  useListenEvent("osc-error", (event: { error: string }) => {
    toast.error(`OSC Error: ${event.error}`, {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
    setIsConnected(false);
    setIsConnectionLoading(false);
  });

  const handleStopClick = () => {
    const result = invokeCommand(oscDisconnectCommand, {});
    console.log("OSC disconnection result:", result);
    setIsConnectionLoading(true);
  };

  const onSubmit = async (data: InferType<typeof addressSchema>) => {
    setIsConnectionLoading(true);

    const result = await invokeCommand(oscConnectCommand, {
      address: data.address,
      port: data.port,
    });

    console.log("OSC connection result:", result);
  };

  const handleDeviceSelect = (device: DeviceInfo) => {
    form.setValue("address", device.ip);
  };

  const handleNetworkScan = async () => {
    try {
      const devices = await invokeCommand(scanNetworkCommand, {});
      setNetworkDevices(devices);
    } catch (error) {
      toast.error("ネットワークスキャンに失敗しました");
      console.error("Network scan failed:", error);
    }
  };

  useEffect(() => {
    handleNetworkScan();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold">OSC</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <h3 className="font-semibold">Send Address</h3>
            {isConnectionLoading ? (
              <Alert>
                <LoaderCircle size={16} className="animate-spin" />
                <Skeleton className="w-24 h-4 my-0.5" />
              </Alert>
            ) : isConnected ? (
              <Alert className="text-emerald-300">
                <CheckCircle2 size={16} />
                Connected
              </Alert>
            ) : (
              <Alert variant="destructive">
                <CircleX size={16} />
                Not connected
              </Alert>
            )}
            <div>
              <div className="flex items-baseline gap-2">
                <div className="flex-1">
                  <div className="flex items-center">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="grow-5 w-36 flex gap-1">
                          <Select
                            onValueChange={(value) => {
                              const device = networkDevices.find(
                                (d) => d.ip === value,
                              );
                              if (device) {
                                handleDeviceSelect(device);
                              }
                            }}
                            value={field.value}
                          >
                            <SelectTrigger>List</SelectTrigger>
                            <SelectContent>
                              {networkDevices.map((device) => (
                                <SelectItem key={device.ip} value={device.ip}>
                                  {device.name} ({device.ip})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="127.0.0.1"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span className="mx-2 text-muted-foreground">:</span>
                    <FormField
                      control={form.control}
                      name="port"
                      render={({ field }) => (
                        <FormItem className="grow-2 w-12">
                          <FormControl>
                            <Input type="text" placeholder="9000" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="port"
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-emerald-300 hover:bg-emerald-300/90 cursor-pointer"
                disabled={isConnected || isConnectionLoading}
              >
                <Play className="fill-current" strokeWidth={0} />
                Start
              </Button>
              <Button
                type="button"
                className="flex-1 bg-destructive hover:bg-destructive/90 cursor-pointer"
                disabled={!isConnected || isConnectionLoading}
                onClick={handleStopClick}
              >
                <Square className="fill-current" strokeWidth={0} />
                Stop
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
