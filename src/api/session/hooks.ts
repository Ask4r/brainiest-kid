import { useMutation } from "@tanstack/react-query";
import { createSession, joinSession, reconnectSessionHost } from "./services";
import { useGameDataStore } from "@/state/game-data/store";
import { setHostLastSessionData } from "@/state/game-data/localStorage";
import { useFlushAllData } from "@/state/hooks";
import { useUserDataStore } from "@/state/user/store";

export function useCreateSession() {
  const flushAllData = useFlushAllData();
  const setGameData = useGameDataStore(state => state.setGameData);
  const setHostData = useUserDataStore(state => state.setHostData);
  return useMutation({
    mutationFn(gameDataString: string) {
      return createSession(gameDataString);
    },
    onSuccess(resp, req) {
      setGameData(JSON.parse(req));
      setHostLastSessionData({ sessionCode: resp.session_code, secret: resp.secret });
      setHostData(resp.session_code);
    },
    onError() {
      flushAllData();
    },
  });
}

export function useReconnectSessionHost() {
  const flushAllData = useFlushAllData();
  const setGameData = useGameDataStore(state => state.setGameData);
  const setHostData = useUserDataStore(state => state.setHostData);
  return useMutation({
    mutationFn(req: { sessionCode: number, secret: string }) {
      return reconnectSessionHost(req.sessionCode, req.secret);
    },
    onSuccess(resp, req) {
      setGameData(JSON.parse(resp.game_data));
      setHostLastSessionData({ sessionCode: resp.session_code, secret: resp.secret });
      setHostData(req.sessionCode);
    },
    onError() {
      flushAllData();
    },
  });
};

export function useJoinSession() {
  const flushAllData = useFlushAllData();
  const setGameData = useGameDataStore(state => state.setGameData);
  const setPlayerData = useUserDataStore(state => state.setPlayerData);
  return useMutation({
    mutationFn(req: { sessionCode: number, name: string }) {
      return joinSession(req.sessionCode, req.name);
    },
    onSuccess(resp, req) {
      setGameData(JSON.parse(resp.game_data));
      setPlayerData(req.sessionCode, resp.id);
    },
    onError() {
      flushAllData();
    },
  });
}
