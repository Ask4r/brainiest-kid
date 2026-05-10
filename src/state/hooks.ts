import { useDecoderStateStore } from "./decoder/store";
import { flushHostLastSessionData } from "./game-data/localStorage";
import { useGameDataStore } from "./game-data/store";
import { useRound1StateStore } from "./round1/store";
import { useRound2StateStore } from "./round2/store";
import { useTiebreakStateStore } from "./tiebreak/store";
import { useUserDataStore } from "./user/store";

export function useFlushAllData() {
  const flushGameData = useGameDataStore(state => state.flushData);
  const flushUserData = useUserDataStore(state => state.flushData);
  const flushRound1Data = useRound1StateStore(state => state.flushData);
  const flushRound2Data = useRound2StateStore(state => state.flushData);
  const flushTiebreakData = useTiebreakStateStore(state => state.flushData);
  const flushDecoderData = useDecoderStateStore(state => state.flushData);
  return () => {
    flushGameData();
    flushUserData();
    flushRound1Data();
    flushRound2Data();
    flushTiebreakData();
    flushDecoderData();
    flushHostLastSessionData();
  };
}
