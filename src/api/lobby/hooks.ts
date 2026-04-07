import { useMutation } from "@tanstack/react-query";
import { useWS } from "@/api/utils/socket";
import { kickPlayer } from "./services";
import type { SessionPlayersResponseDTO } from "./models";

export function useKickPlayer() {
  return useMutation({
    mutationFn(playerId: string) {
      return kickPlayer(playerId);
    },
  });
}

export function useSessionPlayersHostSocket(code: number) {
  return useWS<SessionPlayersResponseDTO[]>(`/ws/host/${code}`);
}

export function useSessionPlayersPlayerSocket(playerId: string) {
  return useWS<SessionPlayersResponseDTO[]>(`/ws/player/${playerId}`);
}
