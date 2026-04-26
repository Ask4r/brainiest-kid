import { useContext } from "react";
import { WSContext } from "./context";

export function useSessionWS() {
  const ctx = useContext(WSContext);
  if (ctx === null) {
    throw new Error("ERROR: Tried to use websoket, but did not connect prior.");
  }
  return ctx.ws;
}
