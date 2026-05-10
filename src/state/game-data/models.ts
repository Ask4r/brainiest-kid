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
    // extraQuestions: {
    //   question: string;
    //   answers: string[];
    //   correctIdx: number;
    // }[];
    tiebreak: {
      words: string[];
      pairWords: string[];
      pairWordsCorrectOrder: number[];
    };
  };

  round2: {
    decoder: {
      hint: string;
      digits: number[];
      word: string;
    };
    categories: {
      category: string;
      questions: { question: string; answer: string; }[];
    }[];
    tiebreak: {
      words: string[];
      pairWords: string[];
      pairWordsCorrectOrder: number[];
    };
  };

  round3: {
    decoder: {
      hint: string;
      digits: number[];
      word: string;
    };
  };
};

export interface PlayerDataState {
  playerId: string,
  playerName: string,
  playerScore: number,
  playerState: PlayerConnectionState,
  playerTurn: number,
};
