import { useSessionWS } from "@/api/ws/hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useFlushAllData } from "@/state/hooks";
import { useRound1StateStore } from "@/state/round1/store";
import { useGameDataStore } from "@/state/game-data/store";
import { useRound2StateStore } from "@/state/round2/store";

export function usePlayerGameActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const navigate = useNavigate();

  const flushAllData = useFlushAllData();

  return useMemo(() => ({

    leaveGame() {
      msg({ action: "left" });
      flushAllData();
      navigate("/");
    },

  }), [flushAllData, msg, navigate]);
}

export function usePlayerDecoderActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    finish(playerId: string) {
      msg({ action: "decoder:finished", data: { player: playerId } });
    },

  }), [msg]);
}

export function usePlayerTiebreakActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    finish(playerId: string) {
      msg({ action: "tiebreak:finished", data: { player: playerId } });
    },

  }), [msg]);
}

export function usePlayerRound1Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const gameData = useGameDataStore(state => state.gameData)!;
  const updatePlayerScore = useGameDataStore(state => state.updatePlayerScore);

  const setPlayerAnswerSubmitIdx = useRound1StateStore(state => state.setPlayerAnswerSubmitIdx);

  return useMemo(() => ({

    submitAnswer(playerId: string, questionIdx: number, submitIdx: number) {
      const question = gameData.round1.questions[questionIdx];
      const isCorrect = question.correctIdx === submitIdx;
      setPlayerAnswerSubmitIdx(submitIdx);
      updatePlayerScore(playerId, isCorrect ? 1 : 0);
      msg({
        action: "round1:answered", data: {
          player_id: playerId,
          question: questionIdx,
          is_correct: isCorrect,
        }
      });
    },

  }), [gameData.round1.questions, msg, setPlayerAnswerSubmitIdx, updatePlayerScore]);
}


export function usePlayerRound2Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const nextQuestion = useRound2StateStore(state => state.nextQuestion);

  return useMemo(() => ({

    skipQuestion(playerId: string, questionIdx: number) {
      nextQuestion(questionIdx);
      msg({
        action: "round2:question-skip", data: {
          player_id: playerId,
          category_idx: 0,
          question_idx: questionIdx,
        }
      });
    },

  }), [msg, nextQuestion]);
}

