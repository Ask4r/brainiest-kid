import { Button } from "@/ui/components/base/buttons/button";
import { Copy02 } from "@untitledui/icons";
import { useClipboard } from "@/ui/hooks/use-clipboard";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { useMemo, useState } from "react";
import { PlayerSwapModal } from "./PlayerSwapModal";
import { useGameDataStore } from "@/state/game-data/store";
import type { PlayerDataState } from "@/state/game-data/models";
import { useUserDataStore } from "@/state/user/store";
import { useHostGameActions } from "@/events/actions/host/hooks";

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

export default function HostLobby() {
  const { copy } = useClipboard();

  const gameData = useGameDataStore(state => state.gameData);
  const players = useGameDataStore(state => state.players);

  const sessionCode = useUserDataStore(state => state.sessionCode);

  const actions = useHostGameActions();

  const joinedPlayers = useMemo(() => {
    return players.filter(p => p.playerState !== "pending");
  }, [players]);

  const pendingPlayers = useMemo(() => {
    return players.filter(p => p.playerState === "pending");
  }, [players]);

  const disconnectedPlayers = useMemo(() => {
    return players.filter(p => p.playerState === "disconnected");
  }, [players]);

  const [isSwapModalOpen, setIsSwapModalOpen] = useState<boolean>(false);
  const [playerSwapNewId, setPlayerSwapNewId] = useState<string | undefined>(undefined);

  const handleKickPlayer = (id: string) => {
    actions.kickPlayer(id);
  };

  const handleLetInPlayer = (id: string) => {
    actions.letPlayerIn(id);
  };

  const handleLetInSwapPlayer = (newId: string) => {
    setPlayerSwapNewId(newId);
    setIsSwapModalOpen(true);
  };

  const handlePlayerSwapConfirm = (oldId: string) => {
    if (playerSwapNewId === undefined) {
      return;
    }
    actions.letPlayerInSwap(oldId, playerSwapNewId);
  };

  const handleCodeCopyClick = () => {
    copy(sessionCode.toString());
  };

  const handleAbortGameClick = () => {
    actions.abortGame();
  };

  const handleProceedClick = () => {
    actions.startNextRound();
  };


  return (
    <main className="section-container max-w-4xl flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        {/* <Button size="md" color="link-gray" iconLeading={ArrowLeft} href="/" isDisabled={true}>Вернуться</Button> */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-xl font-semibold">{gameData?.name}</span>
            <span className="text-tertiary text-md">
              {"Код подключения: "}
              <Button color="link-gray" iconTrailing={<Copy02 size={16} />} onClick={handleCodeCopyClick}>{sessionCode}</Button>
            </span>
          </div>
          <div className="flex gap-3">
            <Button size="md" onClick={handleProceedClick}>Далее</Button>
            <Button size="md" color="primary-destructive" onClick={handleAbortGameClick}>Завершить игру</Button>
          </div>
        </div>
      </header>

      <TableCard.Root className="my-8">
        {joinedPlayers.length > 0 ? (
          <Table aria-label="Участники игры">
            <Table.Header>
              <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
              <Table.Head id="score" label="Счет" />
              <Table.Head id="status" label="Статус" />
              <Table.Head id="actions" />
            </Table.Header>
            <Table.Body items={joinedPlayers}>
              {(player) => (
                <Table.Row id={player.playerId}>
                  <Table.Cell className="whitespace-nowrap">{player.playerName}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{player.playerScore}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{playerStatusString(player)}</Table.Cell>
                  <Table.Cell>
                    <Button color="link-destructive" onClick={() => handleKickPlayer(player.playerId)}>Выгнать</Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        ) : (
          <div className="flex items-center justify-center overflow-hidden px-8 py-20">
            <EmptyState.Root size="sm">
              <EmptyState.Content>
                <EmptyState.Title>Нет игроков</EmptyState.Title>
                <EmptyState.Description>Никто не подключился. Для участия передайте игрокам код подключения.</EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          </div>
        )}
      </TableCard.Root>

      <TableCard.Root className="my-8">
        <TableCard.Header title="Ожидают подключения" />
        {pendingPlayers.length > 0 ? (
          <Table aria-label="Ожидающие игроки">
            <Table.Header hidden>
              <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
              <Table.Head id="actions" />
              <Table.Head id="actions-alternative" />
            </Table.Header>
            <Table.Body items={pendingPlayers}>
              {(player) => (
                <Table.Row id={player.playerId}>
                  <Table.Cell className="whitespace-nowrap">{player.playerName}</Table.Cell>
                  <Table.Cell>
                    <Button color="link-color" onClick={() => handleLetInPlayer(player.playerId)}>Впустить</Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="link-color" onClick={() => handleLetInSwapPlayer(player.playerId)}>Впустить вместо игрока</Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        ) : (
          <div className="flex items-center justify-center overflow-hidden px-8 py-20">
            <EmptyState.Root size="sm">
              <EmptyState.Content>
                <EmptyState.Title>Нет игроков</EmptyState.Title>
                <EmptyState.Description>Здесь будут игроки, ожидающие поключения. Для участия передайте игрокам код подключения.</EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          </div>
        )}
      </TableCard.Root>

      <PlayerSwapModal
        isOpen={isSwapModalOpen}
        disconnectedPlayers={disconnectedPlayers}
        onConfirm={handlePlayerSwapConfirm}
        onOpenChange={setIsSwapModalOpen}
      />
    </main>
  );
}
