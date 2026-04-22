import { getLocalStorage, setLocalStorage } from "@/state/utils/localStorage";

const LAST_SESSION_STORAGE_KEY = "last-session";

interface HostLastSessionData {
  sessionCode: number;
  secret: string;
};

export function getHostLastSessionData() {
  return getLocalStorage<HostLastSessionData>(LAST_SESSION_STORAGE_KEY);
}

export function setHostLastSessionData(data: HostLastSessionData) {
  setLocalStorage(LAST_SESSION_STORAGE_KEY, data);
}


export function flushHostLastSessionData() {
  setLocalStorage(LAST_SESSION_STORAGE_KEY, null);
}
