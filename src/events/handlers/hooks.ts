import type { WSActionMessageResponse } from "@/api/ws/models";
import { useGameDataStore } from "@/state/game-data/store";
import { useFlushAllData } from "@/state/hooks";
import { usePlayerResultsStore } from "@/state/player-results/store";
import { useRound1StateStore } from "@/state/round1/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { useUserDataStore } from "@/state/user/store";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export function useHandleWSMsg() {
  const navigate = useNavigate();

  const flushAllData = useFlushAllData();

  const players = useGameDataStore(state => state.players);
  const currentRound = useGameDataStore(state => state.currentRound);
  const currentMode = useGameDataStore(state => state.currentMode);
  const updatePlayers = useGameDataStore(state => state.updatePlayers);
  const updatePlayerScore = useGameDataStore(state => state.updatePlayerScore);
  const eliminatePlayers = useGameDataStore(state => state.eliminatePlayers);
  const startNextRound = useGameDataStore(state => state.setCurrentRound);
  const startNextMode = useGameDataStore(state => state.setGameMode);

  const playerId = useUserDataStore(state => state.playerId);

  const round1SetNextQuestion = useRound1StateStore(state => state.setNextQuestion);
  const round1ShowQuestion = useRound1StateStore(state => state.showQuestion);
  const round1ShowAnswer = useRound1StateStore(state => state.showAnswer);
  const round1StartExtraQuestions = useRound1StateStore(state => state.startExtraQuestions);

  const tiebreakParticipants = useTiebreakStateStore(state => state.participantsIds);
  const tiebreakAnsweredPlayers = useTiebreakStateStore(state => state.answeredPlayersIds);
  const tiebreakAddAnsweredPlayer = useTiebreakStateStore(state => state.addAnsweredPlayer);

  const setPlayerResults = usePlayerResultsStore(state => state.setPlayerResults);

  return useCallback((msg: WSActionMessageResponse, sendMsg: SendJsonMessage) => {
    switch (msg.action) {
      case "let-in":
      case "swap":
      case "kick":
      case "left":
        break;
      case "abort": {
        flushAllData();
        navigate("/");
        break;
      }
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
      case "next-round": {
        startNextRound();
        navigate("/game");
        break;
      }
      case "next-mode": {
        startNextMode(msg.data.mode);
        break;
      }
      case "decoder:finished": {
        // TODO
        break;
      }
      case "tiebreak:finished": {
        if (tiebreakAnsweredPlayers.includes(msg.data.player)) {
          break;
        }
        const numParticipants = tiebreakParticipants.length;
        const numAnswered = tiebreakAnsweredPlayers.length;
        if (numAnswered === numParticipants - 1) {
          sendMsg({ action: "next-round" });
        }
        tiebreakAddAnsweredPlayer(msg.data.player);
        break;
      }
      case "players-eliminated": {
        if (msg.data.eliminated_players_ids.includes(playerId)) {
          const p = players.find(p => p.playerId === playerId);
          setPlayerResults(false, p?.playerScore ?? 0, currentRound, currentMode);
          navigate("/results");
        }
        eliminatePlayers(msg.data.eliminated_players_ids);
        break;
      }
      case "show-leaderboard": {
        navigate("/leaderboard");
        break;
      }

      // Round 1
      case "round1:next-question": {
        round1SetNextQuestion(msg.data.question);
        break;
      }
      case "round1:answered": {
        updatePlayerScore(msg.data.player_id, msg.data.is_correct ? 1 : 0);
        break;
      }
      case "round1:show-question": {
        round1ShowQuestion();
        break;
      }
      case "round1:show-answer": {
        round1ShowAnswer();
        break;
      }
      case "round1:extra-questions": {
        round1StartExtraQuestions(msg.data.players);
        break;
      }

      // Round 2
      case "round2:show-categories": {
        // TODO
        break;
      }
      case "round2:start-category": {
        // TODO
        break;
      }
      case "round2:next-question": {
        // TODO
        break;
      }
      case "round2:category-answered": {
        // TODO
        break;
      }
      case "round2:question-skip": {
        // TODO
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
  }, [currentMode, currentRound, eliminatePlayers, flushAllData, navigate, playerId, players, round1SetNextQuestion, round1ShowAnswer, round1ShowQuestion, round1StartExtraQuestions, setPlayerResults, startNextMode, startNextRound, tiebreakAddAnsweredPlayer, tiebreakAnsweredPlayers, tiebreakParticipants.length, updatePlayerScore, updatePlayers]);
}
