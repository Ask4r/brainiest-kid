import { useSessionPlayersPlayerSocket } from "@/api/lobby/hooks";
import { usePlayerSessionData } from "@/api/session/hooks";
import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { Button } from "@/ui/components/base/buttons/button";
import { useClipboard } from "@/ui/hooks/use-clipboard";
import { ArrowLeft, Copy02 } from "@untitledui/icons";
import { Navigate, useNavigate } from "react-router";

function playerStatusString(player: { is_connected: boolean, is_eliminated: boolean }) {
  if (player.is_eliminated) {
    return "Выбыл";
  }
  if (!player.is_connected) {
    return "Отключился";
  }
  return "В игре";
}

export function PlayerLobby() {
  const navigate = useNavigate();

  const { copy } = useClipboard();

  const sessionData = usePlayerSessionData();
  const { lastJsonMessage: players, sendJsonMessage } = useSessionPlayersPlayerSocket(sessionData.id);

  const isKicked = players !== null && !players.some(player => player.id === sessionData.id);
  if (isKicked) {
    return <Navigate to="/" />;
  }

  const handleCodeCopyClick = () => {
    copy(sessionData.code.toString());
  };

  const handleLeaveGameClick = () => {
    navigate("/");
    sendJsonMessage({ action: "left" });
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
          <div>
            <Button onClick={handleLeaveGameClick} color="primary-destructive">Покинуть игру</Button>
          </div>
        </div>
      </header>

      <TableCard.Root className="my-8">
        <Table aria-label="Участники игры">
          <Table.Header>
            <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
            <Table.Head id="score" label="Счет" />
            <Table.Head id="status" label="Статус" />
          </Table.Header>
          <Table.Body items={players}>
            {(player) => (
              <Table.Row id={player.id}>
                <Table.Cell className="whitespace-nowrap">{player.name}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{player.score}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{playerStatusString(player)}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    </main>
  );
}
