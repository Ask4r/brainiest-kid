import { useNavigate } from "react-router";
import { useKickPlayer, useSessionPlayersHostSocket } from "@/api/lobby/hooks";
import { useHostSessionData } from "@/api/session/hooks";
import { Button } from "@/ui/components/base/buttons/button";
import { ArrowLeft, Copy02 } from "@untitledui/icons";
import { useClipboard } from "@/ui/hooks/use-clipboard";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { EmptyState } from "@/ui/components/application/empty-state/empty-state";

function playerStatusString(player: { is_connected: boolean, is_eliminated: boolean }) {
  if (player.is_eliminated) {
    return "Выбыл";
  }
  if (!player.is_connected) {
    return "Отключился";
  }
  return "В игре";
}

export function HostLobby() {
  const navigate = useNavigate();
  const { copy } = useClipboard();

  const sessionData = useHostSessionData();
  const { lastJsonMessage: players, sendJsonMessage } = useSessionPlayersHostSocket(sessionData.code);
  const { mutate: kickPlayer } = useKickPlayer();

  const letInPlayer = (id: string) => {
    sendJsonMessage({ action: "let-in", player_id: id });
  };

  const handleCodeCopyClick = () => {
    copy(sessionData.code.toString());
  };

  const handleAbortGameClick = () => {
    sendJsonMessage({ action: "abort" });
    navigate("/");
  };


  return (
    <main className="section-container flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        <Button size="md" color="link-gray" iconLeading={ArrowLeft} href="/" isDisabled={true}>Вернуться</Button>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-xl font-semibold">Новая игра</span>
            <span className="text-tertiary text-md">
              {"Код подключения: "}
              <Button color="link-gray" iconTrailing={<Copy02 size={16} />} onClick={handleCodeCopyClick}>{sessionData.code}</Button>
            </span>
          </div>
          <div className="flex gap-3">
            <Button size="md">Далее</Button>
            <Button size="md" color="primary-destructive" onClick={handleAbortGameClick}>Завершить игру</Button>
          </div>
        </div>
      </header>

      <TableCard.Root className="my-8">
        {players?.length > 0 ? (
          <Table aria-label="Участники игры">
            <Table.Header>
              <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
              <Table.Head id="score" label="Счет" />
              <Table.Head id="status" label="Статус" />
              <Table.Head id="actions" />
            </Table.Header>
            <Table.Body items={players}>
              {(player) => (
                <Table.Row id={player.id}>
                  <Table.Cell className="whitespace-nowrap">{player.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{player.score}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{playerStatusString(player)}</Table.Cell>
                  <Table.Cell>
                    {player.is_connected ? (
                      <Button color="link-destructive" onClick={() => kickPlayer(player.id)}>Выгнать</Button>
                    ) : (
                      <></>
                    )}
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
        {players?.length > 0 ? (
          <Table aria-label="Ожидающие игроки">
            <Table.Header hidden>
              <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
              <Table.Head id="actions" />
              <Table.Head id="actions-alternative" />
            </Table.Header>
            <Table.Body items={players}>
              {(player) => (
                <Table.Row id={player.id}>
                  <Table.Cell className="whitespace-nowrap">{player.name}</Table.Cell>
                  <Table.Cell>
                    <Button color="link-color">Впустить</Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color="link-color">Впустить вместо игрока</Button>
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

    </main>
  );
}
