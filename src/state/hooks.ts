import { flushHostLastSessionData } from "./game-data/localStorage";
import { useGameDataStore } from "./game-data/store";
import { useRound1StateStore } from "./round1/store";
import { useUserDataStore } from "./user/store";

export function useFlushAllData() {
  const flushGameData = useGameDataStore(state => state.flushData);
  const flushUserData = useUserDataStore(state => state.flushData);
  const flushRound1Data = useRound1StateStore(state => state.flushData);
  return () => {
    flushGameData();
    flushUserData();
    flushRound1Data();
    flushHostLastSessionData();
  };
}
