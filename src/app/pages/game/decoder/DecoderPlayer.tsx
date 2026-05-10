import { usePlayerDecoderActions } from "@/events/actions/player";
import { useDecoderStateStore } from "@/state/decoder/store";
import { getCurrentDecoderData, getPassPlayersByRound } from "@/state/game-data/filters";
import { useGameDataStore } from "@/state/game-data/store";
import { useUserDataStore } from "@/state/user/store";
import { Button } from "@/ui/components/base/buttons/button";
import { Input } from "@/ui/components/base/input/input";
import { useState } from "react";

const digits = [
  { digit: 1, letters: ["А", "Б", "В"] },
  { digit: 2, letters: ["Г", "Д", "Е"] },
  { digit: 3, letters: ["Ж", "З", "И"] },
  { digit: 4, letters: ["К", "Л", "М"] },
  { digit: 5, letters: ["Н", "О", "П"] },
  { digit: 6, letters: ["Р", "С", "Т"] },
  { digit: 7, letters: ["У", "Ф", "Х"] },
  { digit: 8, letters: ["Ц", "Ч", "Ш"] },
  { digit: 9, letters: ["Щ", "Ы", "Ь"] },
  undefined,
  { digit: 0, letters: ["Э", "Ю", "Я"] },
  undefined,
];

export default function DecoderPlayer() {
  const playerId = useUserDataStore(state => state.playerId);

  const gameData = useGameDataStore(state => state.gameData)!;
  const currentRound = useGameDataStore(state => state.currentRound);

  const answeredParticipants = useDecoderStateStore(state => state.answeredPlayersIds);

  const actions = usePlayerDecoderActions();

  const [input, setInput] = useState<string>("");
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [isCorrectSubmit, setIsCorrectSubmit] = useState<boolean>(false);
  const [isTooLate, setIsTooLate] = useState<boolean>(false);

  const decoderData = getCurrentDecoderData(gameData, currentRound);

  const passPlayers = getPassPlayersByRound(currentRound - 1);

  const isSubmitDisabled = isCorrectSubmit || isTooLate;

  if (!answeredParticipants.includes(playerId)
    && answeredParticipants.length === passPlayers - 1
    && !isTooLate) {
    actions.finish(playerId);
    setIsTooLate(true);
  }

  const handleSubmitClick = () => {
    if (isSubmitDisabled) {
      return;
    }
    if (decoderData.word.trim().toLowerCase() !== input.trim().toLowerCase()) {
      setIsIncorrect(true);
      return;
    }
    actions.finish(playerId);
    setIsIncorrect(false);
    setIsCorrectSubmit(true);
    return;
  };

  return (
    <main className="section-container my-8 max-w-lg flex flex-col">
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl text-primary font-semibold">Дешифровщик</h3>
          <span className="text-md text-tertiary">Первые ответившие правильно игроки продолжают первыми.</span>
        </div>
      </div>
      <div className="mb-16 flex flex-col gap-4">
        <p className="text-xl text-tertiary">
          По подсказке угадайте слово, зашифрованное номером телефона.
        </p>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[auto_auto_auto] gap-1 w-min">
            {digits.map(d =>
              d === undefined
                ? (
                  <div key={d} />
                ) : (
                  <div key={d.digit} className="w-14 h-14 flex flex-col gap-0.5 align-center justify-center border border-primary rounded-xl">
                    <span key={d.digit} className="text-md font-semibold text-secondary text-center">{d.digit}</span>
                    <span key={d.digit} className="text-sm font-semibold text-tertiary text-center">{d.letters.join("")}</span>
                  </div>
                )
            )}
          </div>
          <div className="mt-8 grid grid-cols-[auto_auto_auto] gap-3">
            <span className="text-xl font-semibold text-secondary">{decoderData.hint}</span>
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-tertiary">
              Шифр:
            </p>
            {decoderData.digits.map(d => (
              <div key={d} className="w-10 h-10 grid items-center border border-secondary rounded-xl">
                <span className="text-xl font-semibold text-tertiary text-center">{d}</span>
              </div>
            ))}
          </div>
        </div>
        <Input placeholder="Введите ответ" isDisabled={isSubmitDisabled} onChange={setInput} />
        <Button isDisabled={isSubmitDisabled} onClick={handleSubmitClick}>Отправить</Button>
        {isTooLate ? (
          <p className="text-xl text-error-primary">
            Время вышло.
          </p>
        ) : isIncorrect ? (
          <p className="text-xl text-error-primary">
            Неправильный ответ.
          </p>
        ) : isCorrectSubmit && (
          <p className="text-xl text-primary">
            Верно!
          </p>
        )}
      </div>
    </main>
  );
}
