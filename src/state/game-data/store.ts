import type { GameDataState, GameModeState, PlayerDataState } from "./models";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameStateStore {
  gameData: GameDataState | undefined;
  players: PlayerDataState[];
  currentRound: 0 | 1 | 2 | 3;
  currentMode: GameModeState;

  setGameData: (gameData: GameDataState) => void;
  flushData: () => void;

  updatePlayers: (players: PlayerDataState[]) => void;
  updatePlayerScore: (playerId: string, addScore: number) => void;
  startNextRound: () => void;
  startNextMode: (mode: GameModeState) => void;
};

export const useGameDataStore = create<GameStateStore>()(
  persist((set, _getState, store) => ({
    gameData: undefined,
    players: [],
    currentRound: 0,
    currentMode: "default",

    setGameData(gameData: GameDataState) {
      set({ gameData });
    },

    flushData() {
      set(store.getInitialState());
    },

    updatePlayers(players: PlayerDataState[]) {
      set({ players });
    },

    updatePlayerScore(playerId: string, addScore: number) {
      set(state => ({
        players: state.players.map(p => {
          if (p.playerId !== playerId) {
            return p;
          }
          return {
            ...p,
            playerScore: p.playerScore + addScore,
          };
        }),
      }));
    },

    startNextRound() {
      set(state => ({
        currentRound: Math.min(3, state.currentRound + 1) as 0 | 1 | 2 | 3,
      }));
    },

    startNextMode(mode: GameModeState) {
      set({ currentMode: mode });
    },
  }), {
    name: "game-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);
