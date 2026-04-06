import { useMutation, useQuery } from "@tanstack/react-query";
import { getPlayers, kickPlayer } from "./services";

const PLAYERS_CACHE_KEYS = ["players"];

interface SessionPlayer {
  id: string;
  name: string;
  score: number;
  is_host: boolean;
  is_connected: boolean;
  is_eliminated: boolean;
};

export function useSessionPlayers(code: number | undefined) {
  return useQuery<SessionPlayer[]>({
    queryKey: PLAYERS_CACHE_KEYS,
    async queryFn() {
      const resp = await getPlayers(code!);
      return resp.map(playerDto => ({
        id: playerDto.id,
        name: playerDto.name,
        score: playerDto.score,
        is_host: playerDto.is_host,
        is_connected: playerDto.is_connected,
        is_eliminated: playerDto.is_eliminated,
      }));
    },
    placeholderData() {
      return [];
    },
    staleTime: Infinity,
    enabled: code !== undefined,
  });
}

export function useKickPlayer() {
  return useMutation({
    mutationFn(playerId: string) {
      return kickPlayer(playerId);
    },
  });
}

