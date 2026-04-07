import { apiFetch } from "@/api/utils/apiFetch";
import type { SessionPlayersResponseDTO } from "./models";

const API_ENDPOINT = "/sessions";

export function getPlayers(code: number) {
  return apiFetch<SessionPlayersResponseDTO[]>(`${API_ENDPOINT}/${code}/players`);
}

export function kickPlayer(playerId: string) {
  return apiFetch<never>(`${API_ENDPOINT}/kick/${playerId}`, {
    method: "DELETE",
  });
}
