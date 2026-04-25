import { useMutation } from "@tanstack/react-query";
import { createSession, joinSession, reconnectSessionHost } from "./services";
import { useGameDataStore } from "@/state/game-data/store";
import { flushHostLastSessionData, setHostLastSessionData } from "@/state/game-data/localStorage";

// API endpoints.

export function useCreateSession() {
  const setCreateSession = useGameDataStore(state => state.setCreateSession);
  const flushSession = useGameDataStore(state => state.flushSession);
  return useMutation({
    mutationFn(gameDataString: string) {
      return createSession(gameDataString);
    },
    onSuccess(resp, req) {
      setCreateSession({
        gameData: JSON.parse(req),
        sessionCode: resp.session_code,
      });
      setHostLastSessionData({ sessionCode: resp.session_code, secret: resp.secret });
    },
    onError() {
      flushSession();
      flushHostLastSessionData();
    },
  });
}

export function useReconnectSessionHost() {
  const setCreateSession = useGameDataStore(state => state.setCreateSession);
  const flushSession = useGameDataStore(state => state.flushSession);
  return useMutation({
    mutationFn(req: { sessionCode: number, secret: string }) {
      return reconnectSessionHost(req.sessionCode, req.secret);
    },
    onSuccess(resp, req) {
      setCreateSession({
        gameData: JSON.parse(resp.game_data),
        sessionCode: req.sessionCode,
      });
      setHostLastSessionData({ sessionCode: resp.session_code, secret: resp.secret });
    },
    onError() {
      flushSession();
      flushHostLastSessionData();
    },
  });
};

export function useJoinSession() {
  const setJoinSession = useGameDataStore(state => state.setJoinSession);
  const flushSession = useGameDataStore(state => state.flushSession);
  return useMutation({
    mutationFn(req: { sessionCode: number, name: string }) {
      return joinSession(req.sessionCode, req.name);
    },
    onSuccess(resp, req) {
      setJoinSession({
        gameData: JSON.parse(resp.game_data),
        sessionCode: req.sessionCode,
        playerId: resp.id,
      });
    },
    onError() {
      flushSession();
    },
  });
}
