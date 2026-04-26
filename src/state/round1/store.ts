import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Round1StateStore {
  currentQuestion: number;
  isShowQuestion: boolean,
  isShowAnswer: boolean;
  playerLastSubmitAnswerIdx: number | undefined;

  setNextQuestion: (newQuestionIdx: number) => void;
  showQuestion: () => void;
  showAnswer: () => void;
  setPlayerLastSubmitAnswerIdx: (answerIdx: number) => void;
  flushData: () => void;
};

export const useRound1StateStore = create<Round1StateStore>()(
  persist((set, _getState, store) => ({
    currentQuestion: 0,
    isShowQuestion: false,
    isShowAnswer: false,
    playerLastSubmitAnswerIdx: undefined,

    setNextQuestion(newQuestionIdx: number) {
      set({
        currentQuestion: newQuestionIdx,
        isShowQuestion: false,
        isShowAnswer: false,
      });
    },

    showQuestion() {
      set({ isShowQuestion: true });
    },

    showAnswer() {
      set({ isShowAnswer: true });
    },

    setPlayerLastSubmitAnswerIdx(answerIdx: number) {
      set({ playerLastSubmitAnswerIdx: answerIdx });
    },

    flushData() {
      set(store.getInitialState());
    },
  }), {
    name: "round1-state",
    storage: createJSONStorage(() => sessionStorage),
  })
);
