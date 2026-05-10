import type { WSActionMessageResponse } from "@/api/ws/models";
import { useDecoderStateStore } from "@/state/decoder/store";
import { useGameDataStore } from "@/state/game-data/store";
import { useRound2StateStore } from "@/state/round2/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { useCallback } from "react";
import type { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export function useHostHandleWSMsg() {
  const updatePlayers = useGameDataStore(state => state.updatePlayers);
  const updatePlayerScore = useGameDataStore(state => state.updatePlayerScore);

  const round2NextQuestion = useRound2StateStore(state => state.nextQuestion);

  const tiebreakPass = useTiebreakStateStore(state => state.passPlayers);
  const tiebreakParticipants = useTiebreakStateStore(state => state.participantsIds);
  const tiebreakAnsweredPlayers = useTiebreakStateStore(state => state.answeredPlayersIds);
  const tiebreakAddAnsweredPlayer = useTiebreakStateStore(state => state.addAnsweredPlayer);

  const decoderAddAnsweredPlayer = useDecoderStateStore(state => state.addAnsweredPlayer);

  return useCallback((msg: WSActionMessageResponse, sendMsg: SendJsonMessage) => {
    switch (msg.action) {
      case "let-in":
      case "swap":
      case "kick":
      case "left":
        // Not handled
        break;

      case "abort":
      case "next-mode":
      case "next-round":
      case "players-eliminated":
      case "show-leaderboard":
      case "round1:next-question":
      case "round1:show-question":
      case "round1:show-answer":
      case "round2:show-categories":
      case "round2:start-category":
      case "round2:next-question":
      case "round2:category-answered":
        // Handled by caller.
        break;

      case "update-players": {
        updatePlayers(msg.data.map(p => ({
          playerId: p.id,
          playerName: p.name,
          playerTurn: p.turn,
          playerScore: p.score,
          playerState: p.state,
        })));
        break;
      }
      case "decoder:finished": {
        decoderAddAnsweredPlayer(msg.data.player);
        break;
      }
      case "tiebreak:finished": {
        if (tiebreakAnsweredPlayers.includes(msg.data.player)) {
          break;
        }
        if (tiebreakAnsweredPlayers.length + 1 === tiebreakPass) {
          const notAnswered = tiebreakParticipants.filter(p => {
            return !tiebreakAnsweredPlayers.includes(p) && p !== msg.data.player;
          });
          sendMsg({
            action: "players-eliminated",
            data: {
              eliminated_players_ids: notAnswered,
            }
          });
        }
        tiebreakAddAnsweredPlayer(msg.data.player);
        break;
      }

      // Round 1
      case "round1:answered": {
        updatePlayerScore(msg.data.player_id, msg.data.is_correct ? 1 : 0);
        break;
      }

      // Round 2
      case "round2:question-skip": {
        round2NextQuestion(msg.data.question_idx);
        break;
      }

      // Round 3
      case "round3:assign-order": {
        // TODO
        break;
      }
      case "round3:assign-categories": {
        // TODO
        break;
      }
      case "round3:show-categories": {
        // TODO
        break;
      }
      case "round3:select-cell": {
        // TODO
        break;
      }
      case "round3:cell-answered": {
        // TODO
        break;
      }
      case "round3:finish-round": {
        // TODO
        break;
      }
    };
  }, [decoderAddAnsweredPlayer, round2NextQuestion, tiebreakAddAnsweredPlayer, tiebreakAnsweredPlayers, tiebreakParticipants, tiebreakPass, updatePlayerScore, updatePlayers]);
}

