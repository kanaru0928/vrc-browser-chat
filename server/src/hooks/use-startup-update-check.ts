import { useEffect, useState } from "react";
import { checkForUpdatesCommand, invokeCommand } from "../lib/commands";

interface UseStartupUpdateCheckOptions {
  onUpdateAvailable?: () => void;
  onUpdateCheckComplete?: (hasUpdate: boolean) => void;
  onError?: (error: unknown) => void;
}

export function useStartupUpdateCheck(options: UseStartupUpdateCheckOptions = {}) {
  const [hasChecked, setHasChecked] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      if (hasChecked) return;

      try {
        const hasUpdate = await invokeCommand(checkForUpdatesCommand, {});
        setUpdateAvailable(hasUpdate as boolean);
        setHasChecked(true);

        options.onUpdateCheckComplete?.(hasUpdate as boolean);

        if (hasUpdate) {
          options.onUpdateAvailable?.();
        }
      } catch (error) {
        console.error("Startup update check failed:", error);
        setHasChecked(true);
        options.onError?.(error);
      }
    };

    // アプリ起動時に少し遅延してからチェック
    const timeoutId = setTimeout(checkForUpdates, 2000);

    return () => clearTimeout(timeoutId);
  }, [hasChecked, options]);

  return { hasChecked, updateAvailable };
}