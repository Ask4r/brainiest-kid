import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const TIMER_INITIAL_SECS = 60;

interface Round2StateStore {
  timerRemSecs: number;
  currentCategoryIdx: number | undefined;
  maxQuestions: number | undefined;
  currentQuestionIdx: number | undefined;
  currentPlayerId: string;
  currentAddedScore: number;
  disabledCategories: number[];

  setCurrentPlayer: (playerId: string) => void;
  addCurrentScore: (value: number) => void;
  nextQuestion: (questionIdx: number) => void;
  selectCategory: (categoryIdx: number, maxQuestions: number) => void;
  finishCategory: () => void;
  decTimer: () => void;
  flushData: () => void;
};

export const useRound2StateStore = create<Round2StateStore>()(
  persist((set, _getState, store) => ({
    timerRemSecs: TIMER_INITIAL_SECS,
    currentCategoryIdx: undefined,
    maxQuestions: undefined,
    currentQuestionIdx: undefined,
    currentPlayerId: "",
    currentAddedScore: 0,
    disabledCategories: [],

    setCurrentPlayer(playerId: string) {
      set({ timerRemSecs: TIMER_INITIAL_SECS, currentPlayerId: playerId });
    },

    addCurrentScore(value: number) {
      set(state => ({ currentAddedScore: state.currentAddedScore + value }));
    },

    nextQuestion(questionIdx: number) {
      set(state => ({
        currentQuestionIdx: state.maxQuestions === undefined
          ? state.currentQuestionIdx
          : Math.min(questionIdx, state.maxQuestions),
      }));
    },

    selectCategory(categoryIdx: number, maxQuestions: number) {
      set({
        currentCategoryIdx: categoryIdx,
        maxQuestions,
        currentQuestionIdx: 0,
      });
    },

    finishCategory() {
      set(state => ({
        timerRemSecs: TIMER_INITIAL_SECS,
        currentCategoryIdx: undefined,
        maxQuestions: undefined,
        currentQuestionIdx: undefined,
        currentPlayerId: "",
        currentAddedScore: 0,
        disabledCategories: state.currentCategoryIdx === undefined
          ? state.disabledCategories
          : [...state.disabledCategories, state.currentCategoryIdx],
      }));
    },

    decTimer() {
      set(state => ({ timerRemSecs: Math.max(state.timerRemSecs - 1, 0) }));
    },

    flushData() {
      set(store.getInitialState());
    },
  }), {
    name: "round2-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);
