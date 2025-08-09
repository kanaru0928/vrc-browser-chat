import { load } from "@tauri-apps/plugin-store";
import type { Store } from "@tauri-apps/plugin-store";

let storeInstance: Store | null = null;

export const getUserStore = async (): Promise<Store> => {
  if (!storeInstance) {
    storeInstance = await load("user.json", { autoSave: true });
  }
  return storeInstance;
};