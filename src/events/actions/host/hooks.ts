import { useSessionWS } from "@/api/ws/hooks";
import { useGameDataStore } from "@/state/game-data/store";
import { useFlushAllData } from "@/state/hooks";
import { useRound1StateStore } from "@/state/round1/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

export function useHostGameActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const navigate = useNavigate();

  const flushAllData = useFlushAllData();

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
      flushAllData();
      navigate("/");
    },

    startNextRound() {
      msg({ action: "next-round" });
      navigate("/game");
    },

    displayLeaderboard() {
      msg({ action: "show-leaderboard" });
    },

  }), [flushAllData, msg, navigate]);
}

export function useHostRound1Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const navigate = useNavigate();

  const location = useLocation();

  const players = useGameDataStore(state => state.players);
  const setGameMode = useGameDataStore(state => state.setGameMode);

  const isExtraQuestions = useRound1StateStore(state => state.isExtraQuestions);
  const setNextQuestion = useRound1StateStore(state => state.setNextQuestion);

  const setTiebreakParticipants = useTiebreakStateStore(state => state.setTiebreakParticipants);

  return useMemo(() => ({

    round1NextQuestion(nextQuestionIdx: number) {
      // Extra questions submit
      if (isExtraQuestions) {
        // Extra questions limit
        if (nextQuestionIdx === 6) {
          const passPlayers = 6;
          const lastPlayerScore = players[passPlayers - 1].playerScore;
          // Check opposing players
          const opposingPlayers = players.filter(p => p.playerScore === lastPlayerScore);
          if (opposingPlayers.length === 1) {
            // If no opposing happened: eliminate everyone but 6 players and start next round.
            msg({
              action: "players-eliminated", data: {
                eliminated_players_ids: players.slice(passPlayers).map(p => p.playerId),
              }
            });
            msg({ action: "next-round" });
            return;
          }
          // else if opposing happened eliminate players with no chances
          const definetlyEliminated = players.filter(p => p.playerScore < lastPlayerScore);
          msg({
            action: "players-eliminated", data: {
              eliminated_players_ids: definetlyEliminated.map(p => p.playerId),
            }
          });
          // else start tiebreak
          msg({ action: "next-mode", data: { mode: "tiebreak" } });
          setTiebreakParticipants(opposingPlayers.map(p => p.playerId));
          setGameMode("tiebreak");
          return;
        }
        // Show next question else
        msg({ action: "round1:next-question", data: { question: nextQuestionIdx } });
        setNextQuestion(nextQuestionIdx);
        return;
      }

      // Show leaderboard arfter 6 questions
      if (nextQuestionIdx === 6) {
        if (location.pathname !== "/leaderboard") {
          navigate("/leaderboard");
          return;
        } else {
          navigate("/game");
        }
      }
      // Finish round after 12 questions
      if (nextQuestionIdx === 13) {
        const passPlayers = 6;
        const lastPlayerScore = players[passPlayers - 1].playerScore;
        // Check opposing players
        const opposingPlayers = players.filter(p => p.playerScore === lastPlayerScore);
        if (opposingPlayers.length === 1) {
          // If no opposing happened: eliminate everyone but 6 players and start next round.
          msg({
            action: "players-eliminated", data: {
              eliminated_players_ids: players.slice(passPlayers).map(p => p.playerId),
            }
          });
          msg({ action: "next-round" });
          return;
        }
        // else if opposing happened eliminate players with no chances
        const definetlyEliminated = players.filter(p => p.playerScore < lastPlayerScore);
        msg({
          action: "players-eliminated", data: {
            eliminated_players_ids: definetlyEliminated.map(p => p.playerId),
          }
        });
        // if extra questions weren't played yet
        if (!isExtraQuestions) {
          // start extra questions
          msg({
            action: "round1:extra-questions", data: {
              players: opposingPlayers.map(p => p.playerId),
            }
          });
          return;
        }
        // else start tiebreak
        msg({ action: "next-mode", data: { mode: "tiebreak" } });
        setTiebreakParticipants(opposingPlayers.map(p => p.playerId));
        setGameMode("tiebreak");
        return;
      }
      // Show next question else
      msg({ action: "round1:next-question", data: { question: nextQuestionIdx } });
      setNextQuestion(nextQuestionIdx);
      return;
    },

    round1ShowQuestion() {
      msg({ action: "round1:show-question" });
    },

    round1ShowCorrectAnswer() {
      msg({ action: "round1:show-answer" });
    },

  }), [isExtraQuestions, location.pathname, msg, navigate, players, setGameMode, setNextQuestion, setTiebreakParticipants]);
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
