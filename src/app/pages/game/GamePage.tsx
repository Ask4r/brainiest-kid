import { Round1Player } from "./Round1Player";
import { Round1Host } from "./Round1Host";
import { useUserDataStore } from "@/state/user/store";

export default function GamePage() {
  const isHost = useUserDataStore(state => state.isHost);

  return (
    <>
      {isHost ? (
        <Round1Host />
      ) : (
        <Round1Player />
      )}
    </>
  );
}
