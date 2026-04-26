import { Outlet } from "react-router";
import { WSProvider } from "@/api/ws/provider";
import { useHandleWSMsg } from "@/events/handlers/hooks";
import { useMemo } from "react";
import { useUserDataStore } from "@/state/user/store";

export function WSRouteLayout() {
  const isHost = useUserDataStore(state => state.isHost);
  const sessionCode = useUserDataStore(state => state.sessionCode);
  const playerId = useUserDataStore(state => state.playerId);

  const handleMsg = useHandleWSMsg();

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

  return (
    <WSProvider url={url} onMessage={handleMsg}>
      <Outlet />
    </WSProvider>
  );
}
