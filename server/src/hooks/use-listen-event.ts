import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

export function useListenEvent<T>(
  eventName: string,
  callback: (event: T) => void
): () => void {
  useEffect(() => {
    let unlisten = () => {};

    const listenEvent = async () => {
      const unlistenEvent = await listen<T>(eventName, (event) => {
        callback(event.payload);
      });

      unlisten = unlistenEvent;
    };

    listenEvent();

    return () => {
      unlisten();
    };
  }, [eventName, callback]);

  return () => {};
}
