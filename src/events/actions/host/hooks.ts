import { useSessionWS } from "@/api/ws/hooks";
import type { GameModeState } from "@/state/game-data/models";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export function useHostGameActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const navigate = useNavigate();

  return useMemo(() => ({

    letPlayerIn(playerId: string) {
      msg({ action: "let-in", data: { player_id: playerId } });
    },

    letPlayerInSwap(playerIdReplaced: string, playerIdNew: string) {
      msg({ action: "swap", data: { player_id: playerIdReplaced, player_id_swap: playerIdNew } });
    },

    kickPlayer(playerId: string) {
      msg({ action: "kick", data: { player_id: playerId } });
    },

    abortGame() {
      msg({ action: "abort" });
    },

    startNextRound() {
      msg({ action: "next-round" });
      navigate("/game");
    },

    startGameMode(mode: GameModeState) {
      msg({ action: "next-mode", data: { mode, } });
    },

    checkAndEliminatePlayers() {
      // TODO
      console.error("TODO");
      // msg({ action: "players-eliminated", data: { eliminated_players_ids: [] } });
    },

    displayLeaderboard() {
      msg({ action: "show-leaderboard" });
    },

  }), [msg, navigate]);
}

export function useHostRound1Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    round1NextQuestion(nextQuestionIdx: number) {
      msg({ action: "round1:next-question", data: { question: nextQuestionIdx } });
    },

    round1ShowQuestion() {
      msg({ action: "round1:show-question" });
    },

    round1ShowCorrectAnswer() {
      msg({ action: "round1:show-answer" });
    },

    round1StartExtraQuestions() {
      // TODO
      console.error("TODO");
      // msg({ action: "round1:show-answer", data: { players: [] } });
    },

  }), [msg]);
}

export function useHostRound2Actions() {
  // const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    round2ShowCategories() {
      // TODO
      console.error("TODO");
      // msg({ action: "round2:show-categories" });
    },

    round2StartCategory() {
      // TODO
      console.error("TODO");
      // msg({ action: "round2:start-category", data: { playerId: "", category_idx: 0 } });
    },

    round2NextQuestion() {
      // TODO
      console.error("TODO");
      // msg({ action: "round2:next-question", data: { playerId: "", category_idx: 0, question_idx: 0 } });
    },

    round2CategoryAnswered() {
      // TODO
      console.error("TODO");
      // msg({ action: "round2:next-question", data: { playerId: "", category_idx: 0, added_score: 0 } });
    },

    round2QuestionsSkip() {
      // TODO
      console.error("TODO");
      // msg({ action: "round2:question-skip", data: { playerId: "", category_idx: 0, question_idx: 0 } });
    },

  }), []);
}

export function useHostRound3Actions() {
  // const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({

    round3AssignColorsAndOrder() {
      // TODO
      console.error("TODO");
      // msg({ action: "round3:assign-order", data: { player_id_order: ["", "", ""] } });
    },

    round3AssignCategories() {
      // TODO
      console.error("TODO");
      // msg({
      //   action: "round3:assign-categories", data: {
      //     assignment: [
      //       { player_id: "", category_idx: 0 },
      //       { player_id: "", category_idx: 0 },
      //       { player_id: "", category_idx: 0 },
      //     ]
      //   }
      // });
    },

    round3ShowCategories() {
      // TODO
      console.error("TODO");
      // msg({ action: "round3:show-categories" });
    },

    round3SelectCell() {
      // TODO
      console.error("TODO");
      // msg({ action: "round3:select-cell", data: { player_id: "", cell: [0, 0] } });
    },

    round3FinishRound() {
      // TODO
      console.error("TODO");
      // msg({ action: "round3:finish-round" });
    },

  }), []);
}
