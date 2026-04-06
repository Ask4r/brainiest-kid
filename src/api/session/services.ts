import { apiFetch } from "@/api/utils/apiFetch";
import type { CreateSessionResponse, JoinSessionResponse } from "./models";

const API_ENDPOINT = "";

export function createSession(name: string) {
  return apiFetch<CreateSessionResponse>(`${API_ENDPOINT}/sessions`, {
    method: "POST",
    body: {
      name,
    }
  });
}

export function joinSession(sessionCode: number, name: string) {
  return apiFetch<JoinSessionResponse>(`${API_ENDPOINT}/sessions/join`, {
    method: "POST",
    body: {
      name,
      code: sessionCode,
    }
  });
}
