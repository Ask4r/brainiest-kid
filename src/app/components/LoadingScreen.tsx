import { LoadingIndicator } from "@/ui/components/application/loading-indicator/loading-indicator";

export function LoadingScreen() {
  return (
    <div className="min-h-[100vh] min-w-[100vw] grid items-center">
      <LoadingIndicator size="lg" label="Загрузка..." />
    </div>
  );
}
