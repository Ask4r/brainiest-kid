import { useReconnectSessionHost } from "@/api/session/hooks";
import { getHostLastSessionData } from "@/state/game-data/localStorage";
import { Button } from "@/ui/components/base/buttons/button";
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
      onError(error) {
        console.error("error", error);
      },
    });
  };

  return (
    <main className="section-container my-24 flex flex-col">
      <Button size="lg" color="primary" href="/join-game">Присоединиться к игре</Button>
      <Button size="lg" color="secondary" className="mt-3" href="/create-game">Создать игру</Button>
      {lastSession !== undefined && (
        <div className="grid place-items-center h-10.5">
          <Button size="lg" color="link-color" onClick={handleLastSessionClick}>Продолжить игру {lastSession.sessionCode}</Button>
        </div>
      )}
    </main>
  );
}
