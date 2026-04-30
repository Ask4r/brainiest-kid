import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GameModeState } from "../game-data/models";

interface PlayerResultsStore {
  isWinner: boolean;
  score: number;
  eliminatedRound: number;
  eliminatedMode: GameModeState;

  setPlayerResults: (isWinner: boolean, score: number, eliminatedRound: number, eliminatedMode: GameModeState) => void;
  flushData: () => void;
};

export const usePlayerResultsStore = create<PlayerResultsStore>()(
  persist((set, _getState, store) => ({
    isWinner: false,
    score: 0,
    eliminatedRound: 0,
    eliminatedMode: "default",

    setPlayerResults(isWinner: boolean, score: number, eliminatedRound: number, eliminatedMode: GameModeState) {
      set({
        isWinner,
        score,
        eliminatedRound,
        eliminatedMode,
      });
    },

    flushData() {
      set(store.getInitialState());
    },
  }), {
    name: "player-results-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);

