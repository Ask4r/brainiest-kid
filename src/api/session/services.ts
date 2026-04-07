import { apiFetch } from "@/api/utils/apiFetch";
import type { CreateSessionResponse, JoinSessionResponse } from "./models";

const API_ENDPOINT = "/sessions";

export function createSession() {
  return apiFetch<CreateSessionResponse>(`${API_ENDPOINT}`, {
    method: "POST",
  });
}

export function joinSession(code: number, name: string) {
  return apiFetch<JoinSessionResponse>(`${API_ENDPOINT}/join`, {
    method: "POST",
    body: {
      name,
      code,
    }
  });
}
