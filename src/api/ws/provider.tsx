import { type PropsWithChildren, useMemo } from "react";
import { WSContext, type WSContextType } from "./context";
import type { WSActionMessageResponse } from "./models";
import { useAPIWebSocket } from "../utils/socket";
import { useGameDataStore } from "@/state/game-data/store";
import { useHandleWSMsg } from "@/events/hooks";

export function WSProvider({ children }: PropsWithChildren) {
  const isHost = useGameDataStore(state => state.isHost);
  const sessionCode = useGameDataStore(state => state.sessionCode);
  const playerId = useGameDataStore(state => state.playerId);

  const handleWSMsg = useHandleWSMsg();

  const url = useMemo(() => {
    if (sessionCode === 0 && playerId === "") {
      return null;
    }
    if (isHost) {
      return `/ws/host/${sessionCode}`;
    } else {
      return `/ws/player/${playerId}`;
    }
  }, [isHost, playerId, sessionCode]);

  const ws = useAPIWebSocket<WSActionMessageResponse>(url, {
    share: true,
    onOpen() {
      console.warn("NOT A WARN: WS open.");
    },
    onMessage(event) {
      const msg = JSON.parse(event.data) as WSActionMessageResponse;
      handleWSMsg(msg);
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
      {children}
    </WSContext>
  );
}
