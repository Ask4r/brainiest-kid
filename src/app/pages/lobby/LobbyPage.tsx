import { useUserDataStore } from "@/state/user/store";
import { lazy } from "react";

const HostLobby = lazy(() => import("./HostLobby"));
const PlayerLobby = lazy(() => import("./PlayerLobby"));

export default function LobbyPage() {
  const isHost = useUserDataStore(state => state.isHost);
  return isHost ? <HostLobby /> : <PlayerLobby />;
}
