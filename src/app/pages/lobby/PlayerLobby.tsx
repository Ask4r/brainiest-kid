import { usePlayerActions } from "@/events/hooks";
import type { PlayerDataState } from "@/state/game-data/models";
import { useGameDataStore } from "@/state/game-data/store";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { Button } from "@/ui/components/base/buttons/button";
import { useClipboard } from "@/ui/hooks/use-clipboard";
import { cx } from "@/ui/utils/cx";
import { ArrowLeft, Copy02 } from "@untitledui/icons";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const { copy } = useClipboard();

  const actions = usePlayerActions();

  const sessionCode = useGameDataStore(state => state.sessionCode);
  const playerId = useGameDataStore(state => state.playerId);
  const players = useGameDataStore(state => state.players);
  // const flushSession = useGameDataStore(state => state.flushSession);

  // const isKicked = wsMessage !== null
  //   && wsMessage.action === "kick"
  //   && wsMessage.data.player_id === playerId;
  // const isAborted = wsMessage !== null
  //   && wsMessage.action === "abort";
  // if (isKicked || isAborted) {
  //   flushSession();
  //   return <Navigate to="/" />;
  // }

  const handleCodeCopyClick = () => {
    copy(sessionCode.toString());
  };

  const handleLeaveGameClick = () => {
    actions.leaveGame();
    navigate("/");
  };

  return (
    <main className="section-container flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        <Button size="md" color="link-gray" className="w-auto" iconLeading={ArrowLeft} href="/" isDisabled={true}>Вернуться</Button>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-xl font-semibold">Новая игра</span>
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
        <Table aria-label="Участники игры">
          <Table.Header>
            <Table.Head id="name" label="Имя" isRowHeader className="w-full max-w-1/4" />
            <Table.Head id="score" label="Счет" />
            <Table.Head id="status" label="Статус" />
          </Table.Header>
          <Table.Body items={players}>
            {(player) => (
              <Table.Row id={player.playerId} className={cx(player.playerId === playerId && "bg-secondary")}>
                <Table.Cell className="whitespace-nowrap">{player.playerName}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{player.playerScore}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{playerStatusString(player)}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    </main>
  );
}
