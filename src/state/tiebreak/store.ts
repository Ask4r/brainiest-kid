import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TiebreakStateStore {
  participantsIds: string[];
  answeredPlayersIds: string[];

  setTiebreakParticipants: (playersIds: string[]) => void;
  addAnsweredPlayer: (playerId: string) => void;
  flushData: () => void;
};

export const useTiebreakStateStore = create<TiebreakStateStore>()(
  persist((set, _getState, store) => ({
    participantsIds: [],
    answeredPlayersIds: [],

    setTiebreakParticipants(playersIds: string[]) {
      set({ participantsIds: playersIds });
    },

    addAnsweredPlayer(playerId: string) {
      set(state => ({
        answeredPlayersIds: state.answeredPlayersIds.includes(playerId)
          ? state.answeredPlayersIds
          : [...state.answeredPlayersIds, playerId],
      }));
    },

    flushData() {
      set(store.getInitialState());
    },
  }), {
    name: "tiebreak-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);
