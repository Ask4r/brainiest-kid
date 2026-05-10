import { useGameDataStore } from "@/state/game-data/store";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { Button } from "@/ui/components/base/buttons/button";
import { useMemo } from "react";
import { useNavigate } from "react-router";

export default function LeaderboardHost() {
  const navigate = useNavigate();

  const players = useGameDataStore(state => state.players);

  const inGamePlayers = useMemo(() => {
    return players.filter(p => p.playerState != "pending");
  }, [players]);

  const handleProceedClick = () => {
    navigate("/game");
  };

  return (
    <main className="section-container max-w-4xl flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-xl font-semibold">Таблица лидеров</span>
          </div>
          <div className="flex gap-3">
            <Button size="md" onClick={handleProceedClick}>Далее</Button>
          </div>
        </div>
      </header>

      <TableCard.Root className="my-8">
        <Table aria-label="Участники игры">
          <Table.Header>
            <Table.Head id="name" label="Имя" isRowHeader />
            <Table.Head id="score" label="Счет" />
          </Table.Header>
          <Table.Body items={inGamePlayers}>
            {(player) => (
              <Table.Row id={player.playerId}>
                <Table.Cell className="whitespace-nowrap">{player.playerName}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{player.playerScore}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    </main>
  );
}
