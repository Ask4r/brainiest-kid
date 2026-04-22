export type GameModeResponse = "default" | "tiebreak" | "decoder";

export type PlayerConnectionStateResponse = "eliminated" | "connected" | "pending" | "disconnected";

export interface CreateSessionResponse {
  session_code: number;
  current_round: number;
  current_mode: GameModeResponse;
  secret: string;
  game_data: string;
};

export interface JoinSessionResponse {
  id: string;
  session_code: number;
  name: string;
  score: number;
  state: PlayerConnectionStateResponse;
  turn: number;
  game_data: string;
};
