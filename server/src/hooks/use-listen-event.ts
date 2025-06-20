import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";

export function useListenEvent<T>(
  eventName: string,
  callback: (event: T) => void | Promise<void>
): () => void {
  useEffect(() => {
    let unlisten = () => {};
    let alreadyUnmounted = false;

    const listenEvent = async () => {
      const unlistenEvent = await listen<T>(eventName, async (event) => {
        await callback(event.payload);
      });

      if (alreadyUnmounted) {
        unlistenEvent();
      } else {
        unlisten = unlistenEvent;
      }
    };

    listenEvent();

    return () => {
      alreadyUnmounted = true;
      unlisten();
    };
  }, [eventName, callback]);

  return () => {};
}
