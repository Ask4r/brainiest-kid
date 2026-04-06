export interface CreateSessionResponse {
  id: number;
  code: number;
  path: string;
  current_round: number;
  current_question: number;
};


export interface JoinSessionResponse {
  id: string;
  session_id: number;
  name: string;
  score: number;
  is_connected: boolean;
  is_host: boolean;
  is_eliminated: boolean;
};
