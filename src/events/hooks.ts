import { useGameDataStore } from "@/state/game-data/store";
import { useFlushAllData } from "@/state/hooks";
import { usePlayerResultsStore } from "@/state/player-results/store";
import { useUserDataStore } from "@/state/user/store";
import { useNavigate } from "react-router";

export function useFinishGame() {
  const navigate = useNavigate();

  const playerId = useUserDataStore(state => state.playerId);

  const players = useGameDataStore(state => state.players);
  const currentRound = useGameDataStore(state => state.currentRound);
  const currentMode = useGameDataStore(state => state.currentMode);

  const setPlayerResults = usePlayerResultsStore(state => state.setPlayerResults);

  const flushAllData = useFlushAllData();

  return (isWinner: boolean) => {
    const p = players.find(p => p.playerId === playerId);
    setPlayerResults(isWinner, p?.playerScore ?? 0, currentRound, currentMode);
    flushAllData();
    navigate("/results");
  };
}
