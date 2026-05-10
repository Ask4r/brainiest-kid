import { Outlet } from "react-router";
import { WSProvider } from "@/api/ws/provider";
import { useMemo } from "react";
import { useUserDataStore } from "@/state/user/store";
import { useHostHandleWSMsg } from "@/events/handlers/host";
import { usePlayerHandleWSMsg } from "@/events/handlers/player";

export function WSRouteLayout() {
  const isHost = useUserDataStore(state => state.isHost);
  const sessionCode = useUserDataStore(state => state.sessionCode);
  const playerId = useUserDataStore(state => state.playerId);

  const hostHandleMsg = useHostHandleWSMsg();
  const playerHandleMsg = usePlayerHandleWSMsg();

  const url = useMemo(() => {
    if (sessionCode === 0) {
      return null;
    }
    if (isHost) {
      return `/ws/host/${sessionCode}`;
    } else {
      return `/ws/player/${playerId}`;
    }
  }, [isHost, playerId, sessionCode]);

  const handle = useMemo(() => {
    return isHost ? hostHandleMsg : playerHandleMsg;
  }, [hostHandleMsg, isHost, playerHandleMsg]);

  return (
    <WSProvider url={url} onMessage={handle}>
      <Outlet />
    </WSProvider>
  );
}
