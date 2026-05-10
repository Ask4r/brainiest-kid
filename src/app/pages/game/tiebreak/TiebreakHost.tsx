import { useHostGameActions } from "@/events/actions/host";
import { useGameDataStore } from "@/state/game-data/store";
import { useTiebreakStateStore } from "@/state/tiebreak/store";
import { Table, TableCard } from "@/ui/components/application/table/table";
import { Button } from "@/ui/components/base/buttons/button";
import { useMemo } from "react";

export default function TiebreakHost() {
  const players = useGameDataStore(state => state.players);

  const tiebreakPass = useTiebreakStateStore(state => state.passPlayers);
  const answeredParticipants = useTiebreakStateStore(state => state.answeredPlayersIds);

  const actions = useHostGameActions();

  const answered = players.filter(p => answeredParticipants.includes(p.playerId));

  const isProceedDisabled = useMemo(() => {
    return answeredParticipants.length < tiebreakPass;
  }, [answeredParticipants.length, tiebreakPass]);

  const handleProceedClick = () => {
    if (isProceedDisabled) {
      return;
    }
    actions.startNextRound();
  };

  return (
    <main className="section-container max-w-4xl flex flex-col">
      <header className="py-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-primary text-xl font-semibold">Тайбрейк</span>
          </div>
          <div className="flex gap-3">
            <Button size="md" isDisabled={isProceedDisabled} onClick={handleProceedClick}>Далее</Button>
          </div>
        </div>
      </header>

      <TableCard.Root className="my-8">
        <Table aria-label="Участники игры">
          <Table.Header>
            <Table.Head id="name" label="Имя" isRowHeader />
            <Table.Head id="order" label="Место" />
          </Table.Header>
          <Table.Body items={answered}>
            {(p) => (
              <Table.Row id={p.playerId}>
                <Table.Cell className="whitespace-nowrap">{p.playerName}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">{answeredParticipants.indexOf(p.playerId) + 1}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableCard.Root>
    </main>
  );
}

