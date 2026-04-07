export interface SessionPlayersResponseDTO {
  id: string;
  session_id: string;
  name: string;
  score: number;
  is_connected: boolean;
  is_eliminated: boolean;
  is_pending: boolean;
}
