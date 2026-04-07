import { useNavigate } from "react-router";
import { useKickPlayer, useSessionPlayersHostSocket } from "@/api/lobby/hooks";
import { useHostSessionData } from "@/api/session/hooks";
import { Button } from "@/ui/components/base/buttons/button";

function playerStatusString(player: { is_connected: boolean, is_eliminated: boolean }) {
  if (player.is_eliminated) {
    return "Выбыл";
  }
  if (!player.is_connected) {
    return "Отключился";
  }
  return "В игре";
}

export function HostLobby() {
  const navigate = useNavigate();

  const sessionData = useHostSessionData();
  const { lastJsonMessage: players, sendJsonMessage } = useSessionPlayersHostSocket(sessionData.code);
  const { mutate: kickPlayer } = useKickPlayer();

  const abortGame = () => {
    sendJsonMessage({ action: "abort" });
    navigate("/");
  };

  const letInPlayer = (id: string) => {
    sendJsonMessage({ action: "let-in", player_id: id });
  };

  return (
    <>
      <span className="text-tertiary">Code: {sessionData?.code}</span>

      {players?.map(player => (
        <div key={player.id} className="flex justify-between text-tertiary">
          <span>{player.name}</span>
          <span>{player.score}</span>
          <span>{playerStatusString(player)}</span>
          {player.is_connected ? (
            <Button color="link-destructive" onClick={() => kickPlayer(player.id)}>Kick</Button>
          ) : player.is_pending ? (
            <Button color="link-destructive" onClick={() => letInPlayer(player.id)}>Kick</Button>
          ) : (
            <> </>
          )}
        </div>
      ))}

      <Button onClick={() => abortGame()} color="primary-destructive">End game</Button>
    </>
  );
}
