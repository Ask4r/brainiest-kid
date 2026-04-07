import { ofetch } from "ofetch";

const API_URL = import.meta.env.VITE_HTTP_API_URL;
if (!API_URL) {
  throw Error("ERROR: \"VITE_HTTP_API_URl\" environment variable is not specified. Check your \".env\".");
}

export const apiFetch = ofetch.create({
  baseURL: API_URL,
});

