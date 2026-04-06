import { ofetch } from "ofetch";

const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = ofetch.create({
  baseURL: `http://${API_URL}`,
});

export function createWebSocket(url: string) {
  return new WebSocket(`ws://${API_URL}${url}`);
}

