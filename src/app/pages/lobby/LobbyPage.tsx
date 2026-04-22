import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { HostLobby } from "./HostLobby";
import { PlayerLobby } from "./PlayerLobby";
import { ArrowLeft, X as Close } from "@untitledui/icons";
import { Button } from "@/ui/components/base/buttons/button";
import { useGameDataStore } from "@/state/game-data/store";


export default function LobbyPage() {
  const isHost = useGameDataStore(state => state.isHost);

  return isHost === undefined ? (
    <main className="section-container my-24 flex flex-col">
      <EmptyState.Root size="md">
        <EmptyState.Header pattern="none">
          <EmptyState.FeaturedIcon color="gray" icon={Close} />
        </EmptyState.Header>

        <EmptyState.Content>
          <EmptyState.Title>
            Нет доступных лобби
          </EmptyState.Title>
          <EmptyState.Description>
            Кажется, вы не подключены. Узнайте ключ подключения у создателя игры.
          </EmptyState.Description>
        </EmptyState.Content>

        <EmptyState.Footer>
          <Button iconLeading={ArrowLeft} color="secondary" size="md" href="/">Главная</Button>
          <Button size="md" href="/join-game">Ввести ключ</Button>
        </EmptyState.Footer>
      </EmptyState.Root>
    </main >
  ) : isHost ? (
    <HostLobby />
  ) : (
    <PlayerLobby />
  );
}
