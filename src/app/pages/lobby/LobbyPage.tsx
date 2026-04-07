import { useIsHost } from "@/api/session/hooks";
import { HostLobby } from "./HostLobby";
import { PlayerLobby } from "./PlayerLobby";


export default function LobbyPage() {
  const isHost = useIsHost();

  return (
    <main className="section-container my-24 flex flex-col">
      {isHost ? (
        <HostLobby />
      ) : (
        <PlayerLobby />
      )}
    </main >
  );
}
