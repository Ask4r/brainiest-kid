export type GameModeState = "default" | "decoder" | "tiebreak";

export type PlayerConnectionState = "eliminated" | "connected" | "pending" | "disconnected";

export interface GameDataState {
  name: string;
  round1: {
    questions: {
      question: string;
      answers: string[];
      correctIdx: number;
    }[];
  };
};

export interface PlayerDataState {
  playerId: string,
  playerName: string,
  playerScore: number,
  playerState: PlayerConnectionState,
  playerTurn: number,
};
