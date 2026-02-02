import { Button } from "@/ui/components/base/buttons/button";

export default function HomePage() {
  return (
    <main className="section-container my-24 flex flex-col">
      <Button size="lg" color="primary" href="/join-game">Присоединиться к игре</Button>
      <Button size="lg" color="secondary" className="mt-3" href="/create-game">Создать игру</Button>
    </main>
  );
}
