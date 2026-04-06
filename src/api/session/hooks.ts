import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSession, joinSession } from "./services";

const SESSION_CACHE_KEYS = ["session"];

type SessionData = {
  id?: string | undefined;
  name: string;
  code: number;
  isHost: boolean;
} | null;

export function useSessionData() {
  const queryClient = useQueryClient();
  return useQuery<SessionData>({
    queryKey: SESSION_CACHE_KEYS,
    queryFn() {
      // Untitlity handler to access session data.
      return queryClient.getQueryData<SessionData>(SESSION_CACHE_KEYS) ?? null;
    },
    placeholderData() {
      return undefined;
    },
    staleTime: Infinity,
    enabled: true,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn(req: { name: string }) {
      return createSession(req.name);
    },
    onSuccess(resp, req) {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, (_oldSession) => {
        return {
          name: req.name,
          code: resp.code,
          isHost: true,
        };
      });
    },
    onError() {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, (_oldSession) => {
        return null;
      });
    },
  });
}

export function useJoinSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn(req: { code: number, name: string }) {
      return joinSession(req.code, req.name);
    },
    onSuccess(resp, req) {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, (_oldSession) => {
        return {
          id: resp.id,
          name: req.name,
          code: req.code,
          isHost: false,
        };
      });
    },
    onError() {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, (_oldSession) => {
        return null;
      });
    },
  });
}
