import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSession, joinSession } from "./services";

const SESSION_CACHE_KEYS = ["session"];

interface HostSessionData {
  code: number;
};

interface PlayerSessionData {
  id: string;
  name: string;
  sessionId: number;
  code: number;
  score: number;
  isConnected: boolean;
  isEliminated: boolean;
};

type SessionData = { isHost: true, data: HostSessionData }
  | { isHost: false, data: PlayerSessionData };


function useSessionData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<SessionData>(SESSION_CACHE_KEYS);
}

export function useIsHost() {
  const data = useSessionData();
  if (data === undefined) {
    throw Error("ERROR: user has no active session.");
  }
  return data.isHost;
}

export function useHostSessionData() {
  const data = useSessionData();
  if (data === undefined) {
    throw Error("ERROR: user has no active session.");
  }
  if (!data.isHost) {
    throw Error("User is player not a host.");
  }
  return data.data;
}

export function usePlayerSessionData() {
  const data = useSessionData();
  if (data === undefined) {
    throw Error("ERROR: user has no active session.");
  }
  if (data.isHost) {
    throw Error("User is host not a player.");
  }
  return data.data;
}


export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn() {
      return createSession();
    },
    onSuccess(resp) {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, () => {
        return {
          isHost: true,
          data: {
            code: resp.code,
          },
        };
      });
    },
    onError() {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, () => {
        return undefined;
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
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, () => {
        return {
          isHost: false,
          data: {
            id: resp.id,
            name: req.name,
            sessionId: resp.session_id,
            code: req.code,
            score: resp.score,
            isConnected: resp.is_connected,
            isEliminated: resp.is_eliminated,
          },
        };
      });
    },
    onError() {
      queryClient.setQueryData<SessionData>(SESSION_CACHE_KEYS, () => {
        return undefined;
      });
    },
  });
}
