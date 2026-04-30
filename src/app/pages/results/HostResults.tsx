import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { Button } from "@/ui/components/base/buttons/button";
import { X } from "@untitledui/icons";

export default function HostResults() {
  return (
    <main className="section-container my-24 flex flex-col">
      <EmptyState size="md">
        <EmptyState.Header pattern="none">
          <EmptyState.FeaturedIcon color="gray" icon={X} />
        </EmptyState.Header>

        <EmptyState.Content>
          <EmptyState.Title>
            Игра завершилась
          </EmptyState.Title>
          <EmptyState.Description>
            Победитель определился.
          </EmptyState.Description>
        </EmptyState.Content>

        <EmptyState.Footer>
          <Button size="md" href="/">Главная</Button>
        </EmptyState.Footer>
      </EmptyState>
    </main>
  );
}
