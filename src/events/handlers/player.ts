import type { WSActionMessageResponse } from "@/api/ws/models";
import { useDecoderStateStore } from "@/state/decoder/store";
import { useGameDataStore } from "@/state/game-data/store";
import { useFlushAllData } from "@/state/hooks";
import { useRound1StateStore } from "@/state/round1/store";
import { useRound2StateStore } from "@/state/round2/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { useUserDataStore } from "@/state/user/store";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { useFinishGame } from "../hooks";

export function usePlayerHandleWSMsg() {
  const navigate = useNavigate();

  const flushAllData = useFlushAllData();

  const gameData = useGameDataStore(state => state.gameData)!;
  const currentRound = useGameDataStore(state => state.currentRound);
  const updatePlayers = useGameDataStore(state => state.updatePlayers);
  const updatePlayerScore = useGameDataStore(state => state.updatePlayerScore);
  const setNextRound = useGameDataStore(state => state.setNextRound);
  const startNextMode = useGameDataStore(state => state.setGameMode);

  const playerId = useUserDataStore(state => state.playerId);

  const round1SetNextQuestion = useRound1StateStore(state => state.setNextQuestion);
  const round1ShowQuestion = useRound1StateStore(state => state.showQuestion);
  const round1ShowAnswer = useRound1StateStore(state => state.showAnswer);

  const round2SetCurrentPlayer = useRound2StateStore(state => state.setCurrentPlayer);
  const round2SelectCategory = useRound2StateStore(state => state.selectCategory);
  const round2NextQuestion = useRound2StateStore(state => state.nextQuestion);
  const round2FinishCategory = useRound2StateStore(state => state.finishCategory);

  const tiebreakAnsweredPlayers = useTiebreakStateStore(state => state.answeredPlayersIds);
  const tiebreakAddAnsweredPlayer = useTiebreakStateStore(state => state.addAnsweredPlayer);
  const setTiebreakParticipants = useTiebreakStateStore(state => state.setTiebreakParticipants);

  const decoderAddAnsweredPlayer = useDecoderStateStore(state => state.addAnsweredPlayer);

  const finishGame = useFinishGame();

  return useCallback((msg: WSActionMessageResponse, _sendMsg: SendJsonMessage) => {
    switch (msg.action) {
      case "let-in":
      case "swap":
      case "kick":
      case "left":
        // Not handled.
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
        if (currentRound === 2) {
          finishGame(true);
          break;
        }
        setNextRound();
        navigate("/game");
        break;
      }
      case "next-mode": {
        if (msg.data.mode === "tiebreak") {
          startNextMode("tiebreak");
          setTiebreakParticipants(msg.data.pass, msg.data.participants);
        } else {
          startNextMode(msg.data.mode);
        }
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
        tiebreakAddAnsweredPlayer(msg.data.player);
        break;
      }
      case "players-eliminated": {
        if (msg.data.eliminated_players_ids.includes(playerId)) {
          finishGame(false);
          break;
        }
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
        if (msg.data.player_id !== playerId) {
          updatePlayerScore(msg.data.player_id, msg.data.is_correct ? 1 : 0);
        }
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

      // Round 2
      case "round2:show-categories": {
        // TODO
        break;
      }
      case "round2:question-skip": {
        if (msg.data.player_id === playerId) {
          // Handled by the caller.
          break;
        }
        round2NextQuestion(msg.data.question_idx);
        break;
      }
      case "round2:start-category": {
        const maxQuestions = gameData.round2.categories[msg.data.category_idx].questions.length;
        round2SetCurrentPlayer(msg.data.player_id);
        round2SelectCategory(msg.data.category_idx, maxQuestions);
        break;
      }
      case "round2:next-question": {
        round2NextQuestion(msg.data.question_idx);
        break;
      }
      case "round2:category-answered": {
        updatePlayerScore(msg.data.player_id, msg.data.added_score);
        round2FinishCategory();
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
  }, [flushAllData, navigate, updatePlayers, currentRound, setNextRound, finishGame, startNextMode, setTiebreakParticipants, decoderAddAnsweredPlayer, tiebreakAnsweredPlayers, tiebreakAddAnsweredPlayer, playerId, round1SetNextQuestion, updatePlayerScore, round1ShowQuestion, round1ShowAnswer, round2NextQuestion, gameData.round2.categories, round2SetCurrentPlayer, round2SelectCategory, round2FinishCategory]);
}

