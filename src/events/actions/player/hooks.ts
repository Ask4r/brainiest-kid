import { useSessionWS } from "@/api/ws/hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useFlushAllData } from "@/state/hooks";

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

  return useMemo(() => ({

    round1SubmitAnswer(playerId: string, questionIdx: number, correct: boolean) {
      msg({ action: "round1:answered", data: { player_id: playerId, question: questionIdx, is_correct: correct } });
    },

  }), [msg]);
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

