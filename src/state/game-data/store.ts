import { flushHostLastSessionData, setHostLastSessionData } from "./localStorage";
import type { GameDataState, GameModeState, PlayerConnectionState, PlayerDataState } from "./models";
import { create } from "zustand";

interface GameStateStore {
  gameData: GameDataState | undefined;
  sessionCode: number;
  players: PlayerDataState[];
  currentRound: 0 | 1 | 2 | 3;
  currentMode: GameModeState;
  // Player data
  isHost: boolean,
  playerId: string;
  playerName: string;
  playerScore: number,
  playerState: PlayerConnectionState;
  playerTurn: number;

  setCreateSession: (data: { gameData: GameDataState, sessionCode: number, secret: string }) => void;
  setJoinSession: (data: { gameData: GameDataState, sessionCode: number, playerId: string, name: string, score: number, state: PlayerConnectionState, turn: number }) => void;
  flushSession: () => void;

  updatePlayers: (players: PlayerDataState[]) => void;
};

export const useGameDataStore = create<GameStateStore>((set, getState, store) => ({
  gameData: undefined,
  sessionCode: 0,
  players: [],
  currentRound: 0,
  currentMode: "default",
  // Player data
  isHost: false,
  playerName: "",
  playerId: "",
  playerScore: 0,
  playerState: "pending",
  playerTurn: 0,

  setCreateSession({ gameData, sessionCode, secret }) {
    set(() => ({
      gameData,
      sessionCode,
      isHost: true,
    }));
    setHostLastSessionData({ sessionCode, secret });
  },

  setJoinSession({ gameData, sessionCode, playerId, name, score, state, turn }) {
    set(() => ({
      gameData,
      sessionCode,
      isHost: false,
      playerId,
      playerName: name,
      playerScore: score,
      playerState: state,
      playerTurn: turn,
    }));
  },

  flushSession() {
    set(store.getInitialState());
    flushHostLastSessionData();
  },

  updatePlayers(players: PlayerDataState[]) {
    const state = getState();
    const playerUpd = state.isHost ? players?.find(p => p.playerId === state.playerId) : undefined;
    set(() => ({
      players,
      playerId: playerUpd?.playerId ?? state.playerId,
      playerName: playerUpd?.playerName ?? state.playerName,
      playerScore: playerUpd?.playerScore ?? state.playerScore,
      playerState: playerUpd?.playerState ?? state.playerState,
      playerTurn: playerUpd?.playerTurn ?? state.playerTurn,
    }));
  }
}));
