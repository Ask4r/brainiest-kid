import { EmptyState } from "@/ui/components/application/empty-state/empty-state";
import { Button } from "@/ui/components/base/buttons/button";
import { ArrowLeft, SearchMd } from "@untitledui/icons";

export function NotFoundPage() {
  return (
    <main className="section-container my-24 flex flex-col">
      <EmptyState size="lg">
        <EmptyState.Header pattern="none">
          <EmptyState.FeaturedIcon color="gray" icon={SearchMd} />
        </EmptyState.Header>

        <EmptyState.Content>
          <EmptyState.Title>
            404 ошибка
          </EmptyState.Title>
          <EmptyState.Description>
            Страница не найдена. Попробуйте вернуться.
          </EmptyState.Description>
        </EmptyState.Content>

        <EmptyState.Footer>
          <Button iconLeading={ArrowLeft} color="secondary" size="md" href="..">Назад</Button>
          <Button size="md" href="/">Главная</Button>
        </EmptyState.Footer>
      </EmptyState>
    </main>
  );
}
