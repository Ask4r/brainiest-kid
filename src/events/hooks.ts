import type { WSActionMessageResponse } from "@/api/ws/models";
import { useGameDataStore } from "@/state/game-data/store";
import { useSessionWS } from "@/api/ws/hooks";
import { useMemo } from "react";

export function useHandleWSMsg() {
  const updatePlayers = useGameDataStore(state => state.updatePlayers);

  return (msg: WSActionMessageResponse) => {
    console.log("WS message:", msg);
    switch (msg.action) {
      case "let-in":
      case "swap":
      case "kick":
      case "left":
        break;
      case "abort": break;
      case "update-players":
        updatePlayers(msg.data.map(p => ({
          playerId: p.id,
          playerName: p.name,
          playerTurn: p.turn,
          playerScore: p.score,
          playerState: p.state,
        })));
        break;
      case "next-round": break;
      case "next-mode": break;
      case "decoder:finished": break;
      case "tiebreak:finished": break;
      case "players-eliminated": break;
      case "show-leaderboard": break;
      case "round1:next-question": break;
      case "round1:answered": break;
      case "round1:show-answer": break;
      case "round1:extra-questions": break;
      case "round2:show-categories": break;
      case "round2:start-category": break;
      case "round2:next-question": break;
      case "round2:category-answered": break;
      case "round2:question-skip": break;
      case "round3:assign-order": break;
      case "round3:assign-categories": break;
      case "round3:show-categories": break;
      case "round3:select-cell": break;
      case "round3:cell-answered": break;
      case "round3:finish-round": break;
    };
  };
}

export function useHostActions() {
  const { sendJsonMessage: msg } = useSessionWS();

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
    // Gameplay
    startNextRound() {
      msg({ action: "next-round" });
    },
    startGameMode() {
      // TODO
      console.error("TODO");
      // msg({ action: "next-mode", data: { mode: "default" } });
    },
    checkAndEliminatePlayers() {
      // TODO
      console.error("TODO");
      // msg({ action: "players-eliminated", data: { eliminated_players_ids: [] } });
    },
    displayLeaderboard() {
      msg({ action: "show-leaderboard" });
    },
    // Round 1
    round1NextQuestion() {
      // TODO
      console.error("TODO");
      // msg({ action: "round1:next-question", data: { question: 0 } });
    },
    round1ShowCorrectAnswer() {
      msg({ action: "round1:show-answer" });
    },
    round1StartExtraQuestions() {
      // TODO
      console.error("TODO");
      // msg({ action: "round1:show-answer", data: { players: [] } });
    },
    // Round 2
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
    // Round 3
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
  }), [msg]);
};

export function usePlayerActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  return useMemo(() => ({
    leaveGame() {
      msg({ action: "left" });
    },
    finishDecoder() {
      msg({ action: "decoder:finished" });
    },
    finishTiebreak() {
      msg({ action: "tiebreak:finished" });
    },
    // Round 1
    round1SubmitAnswer() {
      // TODO
      console.error("TODO");
      // msg({ action: "round1:answered", data: { question: 0, is_correct: true } });
    },
    // Round 2
    round2SkipQuestion() {
      // TODO
      console.error("TODO");
      // msg({ action: "round2:question-skip", data: { player_id: "", category_idx: 0, question_idx: 0 } });
    },
  }), [msg]);
}

