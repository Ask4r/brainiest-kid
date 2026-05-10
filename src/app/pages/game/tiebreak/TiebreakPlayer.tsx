import { usePlayerTiebreakActions } from "@/events/actions/player";
import { getCurrentTiebreakData } from "@/state/game-data/filters";
import { useGameDataStore } from "@/state/game-data/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { useUserDataStore } from "@/state/user/store";
import { Button } from "@/ui/components/base/buttons/button";
import { SwitchVertical01 } from "@untitledui/icons";
import { useMemo, useState } from "react";

export default function TiebreakPlayer() {
  const playerId = useUserDataStore(state => state.playerId);

  const gameData = useGameDataStore(state => state.gameData)!;
  const currentRound = useGameDataStore(state => state.currentRound);

  const participants = useTiebreakStateStore(state => state.participantsIds);

  const actions = usePlayerTiebreakActions();

  const [currentOrder, setCurrentOrder] = useState<number[]>([0, 1, 2, 3]);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [isCorrectSubmit, setIsCorrectSubmit] = useState<boolean>(false);

  const isParticipant = participants.includes(playerId);

  const tiebreakData = getCurrentTiebreakData(gameData, currentRound);

  const displayState = useMemo(() => {
    const state = [];
    for (let i = 0; i < tiebreakData.words.length; i++) {
      const pairIdx = currentOrder[i];
      state.push({
        word: tiebreakData.words[i],
        pair: tiebreakData.pairWords[pairIdx],
      });
    }
    return state;
  }, [currentOrder, tiebreakData.pairWords, tiebreakData.words]);

  const swapOrder = (i: number, j: number) => {
    setCurrentOrder(prev => {
      return prev.map((v, idx) => {
        if (idx === i) {
          return prev[j];
        }
        if (idx === j) {
          return prev[i];
        }
        return v;
      });
    });
  };

  const handleSubmitClick = () => {
    if (isCorrectSubmit) {
      return;
    }
    if (tiebreakData.pairWordsCorrectOrder.every((v, i) => v === currentOrder[i])) {
      actions.finish(playerId);
      setIsIncorrect(false);
      setIsCorrectSubmit(true);
      return;
    }
    setIsIncorrect(true);
  };

  return (
    <main className="section-container my-8 max-w-lg flex flex-col">
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl text-primary font-semibold">Тайбрейк</h3>
          <span className="text-md text-tertiary">Первые ответившие правильно игроки продолжают. Остальные выбывают.</span>
        </div>
      </div>
      <div className="mb-16 flex flex-col gap-4">
        {isParticipant ? (
          <>
            <p className="text-xl text-tertiary">
              Составьте слова в пары.
            </p>
            <div className="flex gap-4">
              <div className="grid grid-cols-[auto_auto_auto] gap-3">
                {displayState.map(s => (
                  <>
                    <span className="text-xl font-semibold text-secondary">{s.word}</span>
                    <span className="text-xl text-tertiary">—</span>
                    <span className="text-xl font-semibold text-secondary">{s.pair}</span>
                  </>
                ))}
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <Button iconLeading={SwitchVertical01} isDisabled={isCorrectSubmit} onClick={() => swapOrder(0, 1)} />
                <Button iconLeading={SwitchVertical01} isDisabled={isCorrectSubmit} onClick={() => swapOrder(1, 2)} />
                <Button iconLeading={SwitchVertical01} isDisabled={isCorrectSubmit} onClick={() => swapOrder(2, 3)} />
              </div>
            </div>
            <Button isDisabled={isCorrectSubmit} onClick={handleSubmitClick}>Отправить</Button>
            {isIncorrect ? (
              <p className="text-xl text-error-primary">
                Неправильный ответ.
              </p>
            ) : isCorrectSubmit && (
              <p className="text-xl text-primary">
                Верно!
              </p>
            )}
          </>
        ) : (
          <p className="text-xl text-tertiary">
            Вы уже прошли и не участвуете в тайбрейке.
          </p>
        )}
      </div>
    </main>
  );
}

