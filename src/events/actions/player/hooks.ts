import { useSessionWS } from "@/api/ws/hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useFlushAllData } from "@/state/hooks";
import { useRound1StateStore } from "@/state/round1/store";
import { useGameDataStore } from "@/state/game-data/store";

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

export function useUserDecoderActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    finishDecoder() {
      msg({ action: "decoder:finished" });
    },

  }), [msg]);
}

export function useUserTiebreakActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    finishTiebreak() {
      msg({ action: "tiebreak:finished" });
    },

  }), [msg]);
}

export function usePlayerRound1Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const gameData = useGameDataStore(state => state.gameData)!;

  const setPlayerAnswerSubmitIdx = useRound1StateStore(state => state.setPlayerAnswerSubmitIdx);

  return useMemo(() => ({

    round1SubmitAnswer(playerId: string, questionIdx: number, submitIdx: number) {
      const question = gameData.round1.questions[questionIdx];
      const isCorrect = question.correctIdx === submitIdx;
      setPlayerAnswerSubmitIdx(submitIdx);
      msg({
        action: "round1:answered", data: {
          player_id: playerId,
          question: questionIdx,
          is_correct: isCorrect,
        }
      });
    },

  }), [gameData.round1.questions, msg, setPlayerAnswerSubmitIdx]);
}


export function usePlayerRound2Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    round2SkipQuestion() {
      // TODO
      console.error("TODO");
      msg({ action: "round2:question-skip", data: { player_id: "", category_idx: 0, question_idx: 0 } });
    },

  }), [msg]);
}

