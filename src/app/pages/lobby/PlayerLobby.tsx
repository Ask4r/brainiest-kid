import { useSessionPlayersPlayerSocket } from "@/api/lobby/hooks";
import { usePlayerSessionData } from "@/api/session/hooks";
import { Button } from "@/ui/components/base/buttons/button";
import { Navigate, useNavigate } from "react-router";

function playerStatusString(player: { is_connected: boolean, is_eliminated: boolean }) {
  if (player.is_eliminated) {
    return "Выбыл";
  }
  if (!player.is_connected) {
    return "Отключился";
  }
  return "В игре";
}

export function PlayerLobby() {
  const navigate = useNavigate();

  const sessionData = usePlayerSessionData();
  const { lastJsonMessage: players, sendJsonMessage } = useSessionPlayersPlayerSocket(sessionData.id);

  const isKicked = players !== null && !players.some(player => player.id === sessionData.id);
  if (isKicked) {
    return <Navigate to="/" />;
  }

  const leaveGame = () => {
    navigate("/");
    sendJsonMessage({ action: "left" });
  };

  return (
    <>
      <span className="text-tertiary">Code: {sessionData.code}</span>

      {players?.map(player => (
        <div key={player.id} className="flex justify-between text-tertiary">
          <span>{player.name}</span>
          <span>{player.score}</span>
          <span>{playerStatusString(player)}</span>
        </div>
      ))}

      <Button onClick={() => leaveGame()} color="primary-destructive">Leave game</Button>
    </>
  );
}
