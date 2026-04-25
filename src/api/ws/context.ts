import type { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { createContext } from "react";
import type { WSActionMessageResponse } from "./models";

export interface WSContextType {
  ws: WebSocketHook<WSActionMessageResponse>;
};

export const WSContext = createContext<WSContextType | null>(null);
