import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { Button } from "@/ui/components/base/buttons/button";
import { ArrowLeft, X } from "@untitledui/icons";

export function NoActiveSessionScreen() {
  return (
    <main className="section-container my-24 flex flex-col">
      <EmptyState.Root size="md">
        <EmptyState.Header pattern="none">
          <EmptyState.FeaturedIcon color="gray" icon={X} />
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
    </main>
  );
}
