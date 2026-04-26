import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserDataStore {
  isHost: boolean
  playerId: string;
  sessionCode: number; // Session code is always defined and non-zero. If is is zero: there is no active game.

  setHostData: (sessionCode: number) => void;
  setPlayerData: (sessionCode: number, playerId: string) => void;
  flushData: () => void;
};

export const useUserDataStore = create<UserDataStore>()(
  persist((set, _getState, store) => ({
    isHost: false,
    playerId: "",
    sessionCode: 0,

    setHostData(sessionCode: number) {
      set({ isHost: true, sessionCode });
    },

    setPlayerData(sessionCode: number, playerId: string) {
      set({ isHost: false, playerId, sessionCode });
    },

    flushData() {
      set(store.getInitialState());
    },
  }), {
    name: "user-data",
    storage: createJSONStorage(() => sessionStorage),
  })
);
