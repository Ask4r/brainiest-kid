import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DecoderStateStore {
  answeredPlayersIds: string[];

  addAnsweredPlayer: (playerId: string) => void;
  flushData: () => void;
};

export const useDecoderStateStore = create<DecoderStateStore>()(
  persist((set, _getState, store) => ({
    answeredPlayersIds: [],

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
    name: "decoder-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);
