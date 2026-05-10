import { useSessionWS } from "@/api/ws/hooks";
import { getDefinetlyEliminatedPlayers, getDefinetlyPassPlayers, getOpposingPlayers, getPassPlayersByRound } from "@/state/game-data/filters";
import type { GameModeState } from "@/state/game-data/models";
import { useGameDataStore } from "@/state/game-data/store";
import { useFlushAllData } from "@/state/hooks";
import { useRound1StateStore } from "@/state/round1/store";
import { useRound2StateStore } from "@/state/round2/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export function useHostGameActions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const navigate = useNavigate();

  const flushAllData = useFlushAllData();

  const setNextRound = useGameDataStore(state => state.setNextRound);
  const setGameMode = useGameDataStore(state => state.setGameMode);

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
      setNextRound();
      msg({ action: "next-round" });
      navigate("/game");
    },

    startGameMode(mode: GameModeState) {
      setGameMode(mode);
      msg({ action: "next-mode", data: { mode } });
    },

    displayLeaderboard() {
      msg({ action: "show-leaderboard" });
      navigate("/leaderboard");
    },

  }), [flushAllData, msg, navigate, setGameMode, setNextRound]);
}

export function useHostRound1Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const players = useGameDataStore(state => state.players);
  const setNextRound = useGameDataStore(state => state.setNextRound);
  const setGameMode = useGameDataStore(state => state.setGameMode);

  const setNextQuestion = useRound1StateStore(state => state.setNextQuestion);
  const showQuestion = useRound1StateStore(state => state.showQuestion);
  const showAnswer = useRound1StateStore(state => state.showAnswer);

  const setTiebreakParticipants = useTiebreakStateStore(state => state.setTiebreakParticipants);

  return useMemo(() => ({

    nextQuestion(nextQuestionIdx: number) {
      // Finish round after 12 questions
      if (nextQuestionIdx === 12) {
        const pass = getPassPlayersByRound(1);
        const opposing = getOpposingPlayers(players, pass);
        const definetlyEliminated = getDefinetlyEliminatedPlayers(players, pass);
        // eliminate players with no chances
        msg({
          action: "players-eliminated",
          data: {
            eliminated_players_ids: definetlyEliminated.map(p => p.playerId),
          }
        });
        if (opposing.length === 1) {
          // if no opposing happened: start next round after elimination
          msg({ action: "next-round" });
          setNextRound();
          return;
        } else {
          // else start tiebreak
          const definetlyPass = getDefinetlyPassPlayers(players, pass);
          const tiebreakPass = pass - definetlyPass.length;
          const participants = opposing.map(p => p.playerId);
          msg({ action: "next-mode", data: { mode: "tiebreak", pass: tiebreakPass, participants } });
          setTiebreakParticipants(tiebreakPass, participants);
          setGameMode("tiebreak");
          return;
        }
      }
      // Show next question else
      msg({ action: "round1:next-question", data: { question: nextQuestionIdx } });
      setNextQuestion(nextQuestionIdx);
      return;
    },

    showQuestion() {
      msg({ action: "round1:show-question" });
      showQuestion();
    },

    showCorrectAnswer() {
      msg({ action: "round1:show-answer" });
      showAnswer();
    },

  }), [msg, players, setGameMode, setNextQuestion, setNextRound, setTiebreakParticipants, showAnswer, showQuestion]);
}

export function useHostRound2Actions() {
  const { sendJsonMessage: msg } = useSessionWS();

  const gameData = useGameDataStore(state => state.gameData)!;
  const players = useGameDataStore(state => state.players);
  const setNextRound = useGameDataStore(state => state.setNextRound);
  const setGameMode = useGameDataStore(state => state.setGameMode);
  const updatePlayerScore = useGameDataStore(state => state.updatePlayerScore);

  const disabledCategories = useRound2StateStore(state => state.disabledCategories);
  const currentPlayer = useRound2StateStore(state => state.currentPlayerId);
  const addedScore = useRound2StateStore(state => state.currentAddedScore);
  const setCurrentPlayer = useRound2StateStore(state => state.setCurrentPlayer);
  const selectCategory = useRound2StateStore(state => state.selectCategory);
  const nextCategoryQuestion = useRound2StateStore(state => state.nextQuestion);
  const addCurrentScore = useRound2StateStore(state => state.addCurrentScore);
  const finishCategory = useRound2StateStore(state => state.finishCategory);

  const setTiebreakParticipants = useTiebreakStateStore(state => state.setTiebreakParticipants);

  return useMemo(() => ({

    startCategory(playerId: string, categoryIdx: number) {
      const maxQuestions = gameData.round2.categories[categoryIdx].questions.length;
      setCurrentPlayer(playerId);
      selectCategory(categoryIdx, maxQuestions);
      msg({ action: "round2:start-category", data: { player_id: playerId, category_idx: categoryIdx } });
    },

    nextQuestion(wasCorrect: boolean, categoryIdx: number, questionIdx: number) {
      if (wasCorrect) {
        addCurrentScore(1);
      }
      nextCategoryQuestion(questionIdx);
      msg({ action: "round2:next-question", data: { player_id: currentPlayer, category_idx: categoryIdx, question_idx: questionIdx } });
    },

    categoryAnswered(categoryIdx: number) {
      updatePlayerScore(currentPlayer, addedScore);
      finishCategory();
      if (disabledCategories.length + 1 >= 12) {
        const pass = getPassPlayersByRound(2);
        const updatedPlayers = players.map(p => {
          if (p.playerId === currentPlayer) {
            return { ...p, playerScore: p.playerScore + addedScore };
          }
          return p;
        });
        const opposing = getOpposingPlayers(updatedPlayers, pass);
        const definetlyEliminated = getDefinetlyEliminatedPlayers(updatedPlayers, pass);
        // eliminate players with no chances
        msg({
          action: "players-eliminated",
          data: {
            eliminated_players_ids: definetlyEliminated.map(p => p.playerId),
          }
        });
        if (opposing.length === 1) {
          // if no opposing happened: start next round after elimination
          msg({ action: "next-round" });
          setNextRound();
          return;
        } else {
          const definetlyPass = getDefinetlyPassPlayers(updatedPlayers, pass);
          const tiebreakPass = pass - definetlyPass.length;
          const participants = opposing.map(p => p.playerId);
          msg({ action: "next-mode", data: { mode: "tiebreak", pass: tiebreakPass, participants } });
          setTiebreakParticipants(tiebreakPass, participants);
          setGameMode("tiebreak");
          return;
        }
      } else {
        msg({ action: "round2:category-answered", data: { player_id: currentPlayer, category_idx: categoryIdx, added_score: addedScore } });
        return;
      }
    },

  }), [addCurrentScore, addedScore, currentPlayer, disabledCategories.length, finishCategory, gameData.round2.categories, msg, nextCategoryQuestion, players, selectCategory, setCurrentPlayer, setGameMode, setNextRound, setTiebreakParticipants, updatePlayerScore]);
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
