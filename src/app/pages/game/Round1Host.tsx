import { Button } from "@/ui/components/base/buttons/button";
import { Timer } from "./Timer";
import { useCallback } from "react";
import { cx } from "@/ui/utils/cx";
import { useGameDataStore } from "@/state/game-data/store";
import { useRound1StateStore } from "@/state/round1/store";
import { useHostRound1Actions } from "@/events/actions/host/hooks";

function getHostActionButtonText(showQuestion: boolean, outOfTime: boolean, showAnswer: boolean) {
  if (!showQuestion) {
    return "Показать вопрос игрокам";
  }
  if (outOfTime && !showAnswer) {
    return "Показать правильный ответ";
  }
  return "Следующий вопрос";
}

function getIsHostActionButtonDisabled(showQuestion: boolean, outOfTime: boolean) {
  if (!showQuestion) {
    return false;
  }
  if (!outOfTime) {
    return true;
  }
  return false;
}

export function Round1Host() {
  const gameData = useGameDataStore(state => state.gameData);

  const currentQuestionIdx = useRound1StateStore(state => state.currentQuestion);
  const isShowQuestion = useRound1StateStore(state => state.isShowQuestion);
  const isShowAnswer = useRound1StateStore(state => state.isShowAnswer);
  const timerRemSecs = useRound1StateStore(state => state.timerRemSecs);

  const actions = useHostRound1Actions();

  const currentQuestion = gameData!.round1.questions[currentQuestionIdx];

  const outOfTime = timerRemSecs === 0;

  const handleHostActionButtonClick = () => {
    if (!isShowQuestion) {
      actions.round1ShowQuestion();
      return;
    }
    if (!outOfTime) {
      return;
    }
    if (!isShowAnswer) {
      actions.round1ShowCorrectAnswer();
      return;
    }
    actions.round1NextQuestion(currentQuestionIdx + 1);
  };

  const hostActionButtonText = getHostActionButtonText(isShowQuestion, outOfTime, isShowAnswer);
  const isHostActionButtonDisabled = getIsHostActionButtonDisabled(isShowQuestion, outOfTime);

  const isButtonGreen = useCallback((idx: number) => {
    return idx === currentQuestion.correctIdx;
  }, [currentQuestion.correctIdx]);


  const isButtonDisabled = useCallback((idx: number) => {
    if (isButtonGreen(idx)) {
      return false;
    }
    return outOfTime;
  }, [isButtonGreen, outOfTime]);

  return (
    <main className="section-container my-8 max-w-lg flex flex-col">
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl text-primary font-semibold">Раунд 1</h3>
          <span className="text-md text-tertiary">Вопрос {currentQuestionIdx + 1}</span>
        </div>
        <div>
          <Button size="md" color="primary" isDisabled={isHostActionButtonDisabled} onClick={handleHostActionButtonClick}>
            {hostActionButtonText}
          </Button>
        </div>
      </div>
      <div className="mb-16 flex flex-col gap-4">
        <p className="text-xl text-tertiary">
          {currentQuestion.question}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.answers.map((ans, idx) => (
            <Button key={ans} size="md" color="primary"
              isDisabled={isButtonDisabled(idx)}
              className={cx(isButtonGreen(idx) && "bg-success-solid")}
            >{ans}</Button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <Timer maxSecs={6} isActive={isShowQuestion} />
      </div>
    </main>
  );
}

