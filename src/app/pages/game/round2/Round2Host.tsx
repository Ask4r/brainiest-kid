import { getOrderedPlayersByTurn } from "@/state/game-data/filters";
import { useGameDataStore } from "@/state/game-data/store";
import { useRound2StateStore } from "@/state/round2/store";
import { Timer } from "./Timer";
import { Button } from "@/ui/components/base/buttons/button";
import { useHostRound2Actions } from "@/events/actions/host";

export default function Round2Host() {
  const gameData = useGameDataStore(state => state.gameData)!;
  const players = useGameDataStore(state => state.players);

  const disabledCategories = useRound2StateStore(state => state.disabledCategories);
  const currentQuestionIdx = useRound2StateStore(state => state.currentQuestionIdx);
  const maxQuestions = useRound2StateStore(state => state.maxQuestions);
  const currentCategoryIdx = useRound2StateStore(state => state.currentCategoryIdx);
  const currentPlayerId = useRound2StateStore(state => state.currentPlayerId);
  const timerRemSecs = useRound2StateStore(state => state.timerRemSecs);

  const actions = useHostRound2Actions();

  const isOutOfTime = timerRemSecs === 0;

  const playersByTurn = getOrderedPlayersByTurn(players);
  const turn = disabledCategories.length;
  const choosingPlayer = playersByTurn[turn % playersByTurn.length];

  const isAnswering = currentCategoryIdx !== undefined;
  const areQuestionsAvailable = (currentQuestionIdx ?? 0) < (maxQuestions ?? 0) && !isOutOfTime;

  const categories = gameData.round2.categories;
  const currentQuestions = isAnswering ? categories[currentCategoryIdx!].questions : undefined;
  const currentPlayer = isAnswering ? players.find(p => p.playerId === currentPlayerId) : undefined;

  const handleCategoryClick = (idx: number) => {
    actions.startCategory(choosingPlayer.playerId, idx);
  };

  const handleAcceptAnswerClick = () => {
    actions.nextQuestion(true, currentCategoryIdx!, currentQuestionIdx! + 1);
  };

  const handleSkipQuestionClick = () => {
    actions.nextQuestion(false, currentCategoryIdx!, currentQuestionIdx! + 1);
  };

  const handleFinishCategoryClick = () => {
    actions.categoryAnswered(currentCategoryIdx!);
  };

  return (
    <main className="section-container my-8 max-w-lg flex flex-col">
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl text-primary font-semibold">Раунд 2</h3>
          <span className="text-md text-tertiary">{isAnswering ? `Вопрос ${currentQuestionIdx! + 1}` : "Таблица категорий"}</span>
        </div>
      </div>
      <div className="mb-16 flex flex-col gap-4">
        {!isAnswering ? (
          <>
            <p className="text-xl text-tertiary">
              Игроки по очереди отвечают на категории. Текущий игрок: {choosingPlayer.playerName}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat, idx) => (
                <Button
                  key={cat.category}
                  isDisabled={disabledCategories.includes(idx)} color={idx === 11 ? "secondary" : "primary"}
                  onClick={() => handleCategoryClick(idx)}>
                  {idx === 11 ? "Скрытая" : cat.category}
                </Button>
              ))}
            </div>
          </>
        ) : areQuestionsAvailable ? (
          <>
            <p className="text-xl text-tertiary">
              Текущий игрок: {currentPlayer?.playerName}. <br />
              Вопрос: {currentQuestions?.[currentQuestionIdx!].question}. <br />
              Правильный ответ: {currentQuestions?.[currentQuestionIdx!].answer}. <br />
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={handleAcceptAnswerClick}>Засчитать</Button>
              <Button color="secondary" onClick={handleSkipQuestionClick}>Пропустить</Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl text-tertiary">
              Вопросы текущей категории закончились.
            </p>
            <Button onClick={handleFinishCategoryClick}>Завершить категорию</Button>
          </>
        )}
      </div>
      <div className="mb-8">
        <Timer maxSecs={60} isActive={isAnswering} />
      </div>
    </main>
  );
}
