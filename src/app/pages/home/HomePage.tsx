import { useReconnectSessionHost } from "@/api/session/hooks";
import { BrandLogomark } from "@/app/components/BrandLogomark";
import { getHostLastSessionData } from "@/state/game-data/localStorage";
import { Button } from "@/ui/components/base/buttons/button";
import { FeaturedIcon } from "@/ui/components/foundations/featured-icon/featured-icon";
import { useNavigate } from "react-router";

export default function HomePage() {
  const lastSession = getHostLastSessionData();
  const navigate = useNavigate();
  const { mutate: reconnectSession } = useReconnectSessionHost();

  const handleLastSessionClick = () => {
    if (lastSession === undefined) {
      return;
    }
    reconnectSession({ sessionCode: lastSession.sessionCode, secret: lastSession.secret }, {
      onSuccess() {
        navigate("/lobby");
      },
    });
  };

  return (
    <main className="section-container my-24 flex flex-col">
      <div className="mx-auto flex flex-col w-full max-w-lg items-center justify-center">
        <header className="mb-8">
          <FeaturedIcon size="xl" color="gray" theme="modern" icon={BrandLogomark} />
        </header>
        <main className="mb-12 flex flex-col items-center gap-4">
          <h1 className="text-display-lg text-primary font-semibold">Самый <span className="text-utility-brand-800">умный</span>?</h1>
          <p className="text-lg text-secondary font-medium">
            Игра-викторина по одноименной телепередаче.
          </p>
        </main>
        <footer>
          <div className="flex gap-3 mb-3">
            <Button size="lg" color="secondary" href="/create-game">Создать игру</Button>
            <Button size="lg" color="primary" href="/join-game">Присоединиться к игре</Button>
          </div>
          {lastSession !== undefined && (
            <div className="grid place-items-center h-10.5">
              <Button size="lg" color="link-color" onClick={handleLastSessionClick}>Продолжить игру {lastSession.sessionCode}</Button>
            </div>
          )}
        </footer>
      </div>
    </main>
  );
}
