import { useUserDataStore } from "@/state/user/store";
import { lazy } from "react";

const HostResults = lazy(() => import("@/app/pages/results/HostResults"));
const PlayerResults = lazy(() => import("@/app/pages/results/PlayerResults"));

export default function ResultsPage() {
  const isHost = useUserDataStore(state => state.isHost);
  return isHost ? <HostResults /> : <PlayerResults />;
}
