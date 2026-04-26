import { usePlayerGameActions } from "@/events/actions/player/hooks";
import type { PlayerDataState } from "@/state/game-data/models";
import { useGameDataStore } from "@/state/game-data/store";
import { useUserDataStore } from "@/state/user/store";
import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { LoadingIndicator } from "@/ui/components/application/loading-indicator/loading-indicator";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { Button } from "@/ui/components/base/buttons/button";
import { useClipboard } from "@/ui/hooks/use-clipboard";
import { cx } from "@/ui/utils/cx";
import { Copy02 } from "@untitledui/icons";

function playerStatusString(player: PlayerDataState) {
  switch (player.playerState) {
    case "disconnected": return "Отключился";
    case "connected": return "В игре";
    case "pending": return "Ожидает";
    case "eliminated": return "Выбыл";
    default:
      console.error("ERROR: unhandled player state:", player.playerState);
      return "";
  }
}

export default function PlayerLobby() {
  const { copy } = useClipboard();

  const actions = usePlayerGameActions();

  const gameData = useGameDataStore(state => state.gameData);
  const players = useGameDataStore(state => state.players);

  const sessionCode = useUserDataStore(state => state.sessionCode);
  const playerId = useUserDataStore(state => state.playerId);

  const isPendingPlayer = players.find(p => p.playerId === playerId)?.playerState === "pending";

  const handleCodeCopyClick = () => {
    copy(sessionCode.toString());
  };

  const handleLeaveGameClick = () => {
    actions.leaveGame();
  };

  return (
    <main className="section-container max-w-4xl flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        {/* <Button size="md" color="link-gray" className="w-auto" iconLeading={ArrowLeft} href="/" isDisabled={true}>Вернуться</Button> */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-xl font-semibold">{gameData?.name}</span>
            <span className="text-tertiary text-md">
              {"Код подключения: "}
              <Button color="link-gray" iconTrailing={<Copy02 size={16} />} onClick={handleCodeCopyClick}>{sessionCode}</Button>
            </span>
          </div>
          <div>
            <Button onClick={handleLeaveGameClick} color="primary-destructive">Покинуть игру</Button>
          </div>
        </div>
      </header>

      <TableCard.Root className="my-8">
        {!isPendingPlayer ? (
          <Table aria-label="Участники игры">
            <Table.Header>
              <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
              <Table.Head id="score" label="Счет" />
              <Table.Head id="status" label="Статус" />
            </Table.Header>
            <Table.Body items={players}>
              {(p) => (
                <Table.Row id={p.playerId} className={cx(p.playerId === playerId && "bg-secondary")}>
                  <Table.Cell className="whitespace-nowrap">{p.playerId === playerId && "(Вы) "}{p.playerName}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{p.playerScore}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{playerStatusString(p)}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        ) : (
          <div className="flex items-center justify-center overflow-hidden px-8 py-20">
            <EmptyState.Root size="sm">
              <EmptyState.Header pattern="none">
                <LoadingIndicator type="line-simple" size="md" />
              </EmptyState.Header>
              <EmptyState.Content>
                <EmptyState.Title>Ожидаем подключения</EmptyState.Title>
                <EmptyState.Description>Создатель игры должен принят вас. Попросите его впустить вас в игру.</EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          </div>
        )}
      </TableCard.Root>
    </main>
  );
}
