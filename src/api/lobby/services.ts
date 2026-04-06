import { apiFetch, createWebSocket } from "@/api/utils/apiFetch";
import type { SessionPlayersResponseDTO } from "./models";

const API_ENDPOINT = "";

export function getPlayers(code: number) {
  return apiFetch<SessionPlayersResponseDTO[]>(`${API_ENDPOINT}/sessions/${code}/players`);
}

export function kickPlayer(playerId: string) {
  return apiFetch<never>(`${API_ENDPOINT}/sessions/kick/${playerId}`, {
    method: "DELETE",
  });
}

export function hostPlayersListSocket(code: number) {
  return createWebSocket(`/ws/host/${code}`);
}

export function playerPlayersListSocket(playerId: string) {
  return createWebSocket(`/ws/player/${playerId}`);
}
