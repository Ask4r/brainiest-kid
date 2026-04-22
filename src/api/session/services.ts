import { apiFetch } from "@/api/utils/apiFetch";
import type { CreateSessionResponse, JoinSessionResponse } from "./models";

const API_ENDPOINT = "/sessions";


export function createSession(gameDataString: string) {
  return apiFetch<CreateSessionResponse>(`${API_ENDPOINT}`, {
    method: "POST",
    body: {
      game_data: gameDataString,
    }
  });
}

export function reconnectSessionHost(sessionCode: number, secret: string) {
  return apiFetch<CreateSessionResponse>(`${API_ENDPOINT}/reconnect`, {
    method: "POST",
    body: {
      session_code: sessionCode,
      secret,
    },
  });
}

export function joinSession(sessionCode: number, name: string) {
  return apiFetch<JoinSessionResponse>(`${API_ENDPOINT}/join`, {
    method: "POST",
    body: {
      name,
      session_code: sessionCode,
    }
  });
}
