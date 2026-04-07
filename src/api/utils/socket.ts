import useWebSocket, { type Options } from "react-use-websocket";

const API_URL = import.meta.env.VITE_WS_API_URL;
if (!API_URL) {
  throw Error("ERROR: \"VITE_WS_API_URl\" environment variable is not specified. Check your \".env\".");
}

export function useWS<T>(url: string, options?: Options) {
  return useWebSocket<T>(`${API_URL}${url}`, {
    share: true,
    retryOnError: true,
    shouldReconnect: () => true,
    ...options,
  });
}

