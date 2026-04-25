import type { GameModeResponse, PlayerConnectionStateResponse } from "@/api/session/models";

export interface SessionPlayerResponseDTO {
  id: string;
  session_code: number;
  name: string;
  score: number;
  state: PlayerConnectionStateResponse;
  turn: number;
};

export type WSActionMessageResponse =
  // Lobby
  {
    action: "let-in";
    data: {
      player_id: string;
    };
  } | {
    action: "swap";
    data: {
      /** Old (replaced) player */
      player_id: string;
      /** New player */
      player_id_swap: string;
    };
  } | {
    action: "kick",
    data: {
      player_id: string;
    },
  } | {
    action: "abort";
  } | {
    action: "left";
  } | {
    action: "update-players";
    data: SessionPlayerResponseDTO[];
  } |
  // Gameplay
  {
    action: "next-round";
  } | {
    action: "next-mode";
    data: {
      mode: GameModeResponse;
    };
  } | {
    action: "decoder:finished";
  } | {
    action: "tiebreak:finished";
  } | {
    action: "players-eliminated";
    data: {
      eliminated_players_ids: string[];
    };
  } | {
    action: "show-leaderboard";
  } |
  // Round 1
  {
    action: "round1:next-question";
    data: {
      question: number;
    };
  } | {
    action: "round1:answered";
    data: {
      question: number;
      is_correct: boolean;
    };
  } | {
    action: "round1:show-answer";
  } | {
    action: "round1:extra-questions";
    data: {
      players: string[];
    };
  } |
  // Round 2
  {
    action: "round2:show-categories";
  } | {
    action: "round2:start-category";
    data: {
      player_id: string;
      category_idx: number;
    };
  } | {
    action: "round2:next-question";
    data: {
      player_id: string;
      category_idx: number;
      question_idx: number;
    };
  } | {
    action: "round2:category-answered";
    data: {
      player_id: string;
      category_idx: number;
      added_score: number;
    };
  } | {
    action: "round2:question-skip";
    data: {
      player_id: string;
      category_idx: number;
      question_idx: number;
    };
  } |
  // Round 3
  {
    action: "round3:assign-order";
    data: {
      player_id_order: string[];
    };
  } | {
    action: "round3:assign-categories";
    data: {
      assignment: {
        player_id: string;
        category_idx: number;
      }[];
    };
  } | {
    action: "round3:show-categories";
  } | {
    action: "round3:select-cell";
    data: {
      player_id: string;
      /** \[row, col\] */
      cell: [number, number];
    };
  } | {
    action: "round3:cell-answered";
    data: {
      player_id: string;
      /** \[row, col\] */
      cell: [number, number];
      added_score: number;
    };
  } | {
    action: "round3:finish-round";
  };
