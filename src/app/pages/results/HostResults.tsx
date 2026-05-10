import { useGameDataStore } from "@/state/game-data/store";
import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { Button } from "@/ui/components/base/buttons/button";
import { Check } from "@untitledui/icons";

export default function HostResults() {
  const players = useGameDataStore(state => state.players);

  const winner = players
    .filter(p => p.playerState !== "eliminated")
    .sort((p1, p2) => p2.playerScore - p1.playerScore)[0];

  return (
    <main className="section-container my-24 flex flex-col">
      <EmptyState size="md">
        <EmptyState.Header pattern="none">
          <EmptyState.FeaturedIcon color="gray" icon={Check} />
        </EmptyState.Header>

        <EmptyState.Content>
          <EmptyState.Title>
            Победитель - {winner.playerName}
          </EmptyState.Title>
          <EmptyState.Description>
            Игра завершилась. Победитель определился!
          </EmptyState.Description>
        </EmptyState.Content>

        <EmptyState.Footer>
          <Button size="md" href="/">Главная</Button>
        </EmptyState.Footer>
      </EmptyState>
    </main>
  );
}
