import type { GameDataState, GameModeState, PlayerDataState } from "./models";
import { create } from "zustand";

interface GameStateStore {
  gameData: GameDataState | undefined;
  sessionCode: number;
  players: PlayerDataState[];
  currentRound: 0 | 1 | 2 | 3;
  currentMode: GameModeState;
  // Player data
  isHost: boolean,
  playerId: string,

  setCreateSession: (data: { gameData: GameDataState, sessionCode: number }) => void;
  setJoinSession: (data: { gameData: GameDataState, sessionCode: number, playerId: string }) => void;
  flushSession: () => void;

  updatePlayers: (players: PlayerDataState[]) => void;
};

export const useGameDataStore = create<GameStateStore>((set, _getState, store) => ({
  gameData: undefined,
  sessionCode: 0,
  players: [],
  currentRound: 0,
  currentMode: "default",
  isHost: false,
  playerId: "",

  setCreateSession({ gameData, sessionCode }) {
    set({
      gameData,
      sessionCode,
      isHost: true,
    });
  },

  setJoinSession({ gameData, sessionCode, playerId }) {
    set({
      gameData,
      sessionCode,
      isHost: false,
      playerId,
    });
  },

  flushSession() {
    set(store.getInitialState());
  },

  updatePlayers(players: PlayerDataState[]) {
    set({ players, });
  }
}));
