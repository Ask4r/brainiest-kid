import { useMemo, type ReactNode } from "react";
import { WSContext, type WSContextType } from "./context";
import type { WSActionMessageResponse } from "./models";
import { useAPIWebSocket } from "../utils/socket";

interface Props {
  url: string | null;
  children: ReactNode;
  onMessage: (msg: WSActionMessageResponse) => void;
}

export function WSProvider(props: Props) {
  const ws = useAPIWebSocket<WSActionMessageResponse>(props.url, {
    share: true,
    onOpen() {
      console.warn("NOT A WARN: WS open.");
    },
    onMessage(event) {
      const msg = JSON.parse(event.data) as WSActionMessageResponse;
      props.onMessage(msg);
    },
    onClose() {
      console.warn("NOT A WARN: WS closed.");
    },
    onError(event) {
      console.error(event);
    },
  });

  const ctx = useMemo<WSContextType>(() => ({
    ws,
  }), [ws]);

  return (
    <WSContext value={ctx}>
      {props.children}
    </WSContext>
  );
}
