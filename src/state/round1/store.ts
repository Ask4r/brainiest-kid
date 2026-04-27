import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const TIMER_INITIAL_SECS = 6;

interface Round1StateStore {
  currentQuestion: number;
  isShowQuestion: boolean,
  isShowAnswer: boolean;
  timerRemSecs: number;
  playerAnswerSubmitIdx: number | undefined;

  setNextQuestion: (newQuestionIdx: number) => void;
  showQuestion: () => void;
  showAnswer: () => void;
  decTimer: () => void;
  setPlayerAnswerSubmitIdx: (answerIdx: number) => void;
  flushData: () => void;
};

export const useRound1StateStore = create<Round1StateStore>()(
  persist((set, _getState, store) => ({
    currentQuestion: 0,
    isShowQuestion: false,
    isShowAnswer: false,
    timerRemSecs: TIMER_INITIAL_SECS,
    playerAnswerSubmitIdx: undefined,

    setNextQuestion(newQuestionIdx: number) {
      set({
        currentQuestion: newQuestionIdx,
        isShowQuestion: false,
        isShowAnswer: false,
        timerRemSecs: TIMER_INITIAL_SECS,
        playerAnswerSubmitIdx: undefined,
      });
    },

    showQuestion() {
      set({ isShowQuestion: true });
    },

    showAnswer() {
      set({ isShowAnswer: true });
    },

    decTimer() {
      set(state => ({ timerRemSecs: Math.max(state.timerRemSecs - 1, 0) }));
    },

    setPlayerAnswerSubmitIdx(answerIdx: number) {
      set({ playerAnswerSubmitIdx: answerIdx });
    },

    flushData() {
      set(store.getInitialState());
    },
  }), {
    name: "round1-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);
