import { usePlayerResultsStore } from "@/state/player-results/store";
import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { Button } from "@/ui/components/base/buttons/button";
import { X } from "@untitledui/icons";


export default function PlayerResults() {
  const isWinner = usePlayerResultsStore(state => state.isWinner);
  const score = usePlayerResultsStore(state => state.score);
  const eliminatedRound = usePlayerResultsStore(state => state.eliminatedRound);
  const eliminatedMode = usePlayerResultsStore(state => state.eliminatedMode);

  return (
    <main className="section-container my-24 flex flex-col">
      <EmptyState size="md">
        <EmptyState.Header pattern="none">
          <EmptyState.FeaturedIcon color="gray" icon={X} />
        </EmptyState.Header>

        <EmptyState.Content>
          <EmptyState.Title>
            {isWinner ? "Вы победили!" : "Не самый умный :("}
          </EmptyState.Title>
          <EmptyState.Description>
            {isWinner ? "Вы обошли остальных игроков." : "Вы выбыли из игры."}<br/>
            Ваш счет: {score}.<br/>
            {!isWinner && `Продержались до ${eliminatedRound} рануда, режим ${eliminatedMode}.`}<br/>
          </EmptyState.Description>
        </EmptyState.Content>

        <EmptyState.Footer>
          <Button size="md" href="/">Главная</Button>
        </EmptyState.Footer>
      </EmptyState>
    </main>
  );
}
