import { getVersion } from "@tauri-apps/api/app";
import { useEffect, useState } from "react";

export function useAppVersion() {
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppVersion = async () => {
      const version = await getVersion();
      setAppVersion(version);
      setIsLoading(false);
    };

    fetchAppVersion();
  }, []);

  return { appVersion, isLoading };
}
