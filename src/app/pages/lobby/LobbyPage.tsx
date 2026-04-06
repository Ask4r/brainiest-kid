import { useKickPlayer } from "@/api/lobby/hooks";
import { hostPlayersListSocket, playerPlayersListSocket } from "@/api/lobby/services";
import { useSessionData } from "@/api/session/hooks";
import { Button } from "@/ui/components/base/buttons/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function playerStatusString(player: { is_connected: boolean, is_eliminated: boolean }) {
  if (player.is_eliminated) {
    return "Выбыл";
  }
  if (!player.is_connected) {
    return "Отключился";
  }
  return "В игре";
}


export default function LobbyPage() {
  const navigate = useNavigate();
  const socketRef = useRef<WebSocket>(undefined);
  const [players, setPlayers] = useState<{
    id: string,
    name: string,
    score: number,
    is_connected: boolean,
    is_eliminated: boolean
  }[]>([]);
  const { data: sessionData } = useSessionData();
  // const { data: players } = useSessionPlayers(sessionData?.code);
  const { mutate: kickPlayer } = useKickPlayer();

  const closeSocket = () => {
    socketRef.current?.close();
    socketRef.current = undefined;
  };

  useEffect(() => {
    if (socketRef.current !== undefined) {
      return;
    }
    if (sessionData?.isHost) {
      socketRef.current = hostPlayersListSocket(sessionData?.code as number);
    } else {
      socketRef.current = playerPlayersListSocket(sessionData?.id as string);
    }
    socketRef.current.addEventListener("message", event => {
      const newPlayers = JSON.parse(event.data);
      if (!sessionData?.isHost) {
        const currentPlayerId = sessionData?.id;

        if (!newPlayers.some((player: { id: string }) => player.id === currentPlayerId)) {
          closeSocket();
          navigate("/");
        }
      }
      setPlayers(newPlayers);
    });

    return () => {
      closeSocket();
      console.log("socket closed");
    };
  }, [sessionData?.code, sessionData?.id, sessionData?.isHost]);

  const leaveGame = () => {
    if (socketRef.current === undefined || socketRef.current?.readyState !== WebSocket.OPEN) {
      return;
    }
    socketRef.current.send(JSON.stringify({
      action: "left"
    }));
    closeSocket();
    navigate("/");
  };


  return (
    <main className="section-container my-24 flex flex-col">

      <span className="text-tertiary">Code: {sessionData?.code}</span>

      {players?.map(player => (
        <div key={player.id} className="flex justify-between text-tertiary">
          <span>{player.name}</span>
          <span>{player.score}</span>
          <span>{playerStatusString(player)}</span>
          {sessionData?.isHost && (
            <Button color="link-destructive" onClick={() => kickPlayer(player.id)}>Kick</Button>
          )}
        </div>
      ))}

      <Button onClick={() => leaveGame()} color="primary-destructive">Leave game</Button>
    </main >
  );
}
