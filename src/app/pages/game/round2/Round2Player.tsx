import { useRound2StateStore } from "@/state/round2/store";
import { Timer } from "./Timer";
import { Button } from "@/ui/components/base/buttons/button";
import { useUserDataStore } from "@/state/user/store";
import { useGameDataStore } from "@/state/game-data/store";
import { usePlayerRound2Actions } from "@/events/actions/player";

export default function Round2Player() {
  const gameData = useGameDataStore(state => state.gameData)!;

  const playerId = useUserDataStore(state => state.playerId);

  const currentQuestionIdx = useRound2StateStore(state => state.currentQuestionIdx);
  const currentCategoryIdx = useRound2StateStore(state => state.currentCategoryIdx);
  const currentPlayerId = useRound2StateStore(state => state.currentPlayerId);

  const actions = usePlayerRound2Actions();

  const isAnswering = playerId === currentPlayerId;

  const category = currentCategoryIdx === undefined
    ? undefined
    : gameData.round2.categories[currentCategoryIdx];

  const question = currentQuestionIdx === undefined
    ? undefined
    : category?.questions[currentQuestionIdx];

  const handleSkipClick = () => {
    if (!isAnswering) {
      return;
    }
    actions.skipQuestion(playerId, currentQuestionIdx! + 1);
    return;
  };

  return (
    <main className="section-container my-8 max-w-lg flex flex-col">
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl text-primary font-semibold">Раунд 2</h3>
          <span className="text-md text-tertiary">{currentQuestionIdx === undefined ? "Таблица категорий" : `Вопрос ${currentQuestionIdx + 1}`}</span>
        </div>
      </div>
      <div className="mb-16 flex flex-col gap-4">
        {isAnswering ? (
          <>
            <p className="text-xl text-tertiary">
              {question?.question}
            </p>
            <div className="flex flex-col gap-3">
              <Button size="md" color="secondary" onClick={handleSkipClick}>Пропустить</Button>
            </div>
          </>
        ) : (
          <p className="text-xl text-tertiary">
            Ожидайте вашего хода.
          </p>
        )}
      </div>
      <div className="mb-8">
        <Timer maxSecs={60} isActive={isAnswering} />
      </div>
    </main>
  );
}
