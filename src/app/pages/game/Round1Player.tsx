import { Button } from "@/ui/components/base/buttons/button";
import { Timer } from "./Timer";
import { useCallback } from "react";
import { cx } from "@/ui/utils/cx";
import { useGameDataStore } from "@/state/game-data/store";
import { useUserDataStore } from "@/state/user/store";
import { useRound1StateStore } from "@/state/round1/store";
import { usePlayerRound1Actions } from "@/events/actions/player/hooks";

export function Round1Player() {
  const gameData = useGameDataStore(state => state.gameData);

  const playerId = useUserDataStore(state => state.playerId);

  const currentQuestionIdx = useRound1StateStore(state => state.currentQuestion);
  const isShowQuestion = useRound1StateStore(state => state.isShowQuestion);
  const isShowAnswer = useRound1StateStore(state => state.isShowAnswer);
  const timerRemSecs = useRound1StateStore(state => state.timerRemSecs);
  const submitAnswerIdx = useRound1StateStore(state => state.playerAnswerSubmitIdx);

  const playerActions = usePlayerRound1Actions();

  const currentQuestion = gameData!.round1.questions[currentQuestionIdx];

  const handleAnswerClick = (idx: number) => {
    if (timerRemSecs === 0) {
      return;
    }
    playerActions.round1SubmitAnswer(playerId, idx, idx);
  };

  const isButtonGreen = useCallback((idx: number) => {
    return isShowAnswer && idx === currentQuestion.correctIdx;
  }, [currentQuestion.correctIdx, isShowAnswer]);

  const isButtonDisabled = useCallback((idx: number) => {
    if (isButtonGreen(idx)) {
      return false;
    }
    if (isShowQuestion && submitAnswerIdx !== undefined) {
      return idx !== submitAnswerIdx;
    }
    return timerRemSecs === 0;
  }, [isButtonGreen, isShowQuestion, submitAnswerIdx, timerRemSecs]);

  return (
    <main className="section-container my-8 max-w-lg flex flex-col">
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl text-primary font-semibold">Раунд 1</h3>
          <span className="text-md text-tertiary">Вопрос {currentQuestionIdx + 1}</span>
        </div>
      </div>
      <div className="mb-16 flex flex-col gap-4">
        {isShowQuestion ? (
          <>
            <p className="text-xl text-tertiary">
              {currentQuestion.question}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.answers.map((ans, idx) => (
                <Button key={ans} size="md" color="primary"
                  isDisabled={isButtonDisabled(idx)}
                  className={cx(isButtonGreen(idx) && "bg-success-solid")}
                  onClick={() => handleAnswerClick(idx)}
                >{ans}</Button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xl text-tertiary">
            Ожидайте появления вопроса.
          </p>
        )}
      </div>
      <div className="mb-8">
        <Timer maxSecs={6} isActive={isShowQuestion} />
      </div>
    </main>
  );
}
