import { useUserDataStore } from "@/state/user/store";
import { lazy } from "react";

const LeaderboardHost = lazy(() => import("@/app/pages/leaderboard/LeaderboardHost"));
const LeaderboardPlayer = lazy(() => import("@/app/pages/leaderboard/LeaderboardPlayer"));

export default function LeaderboardPage() {
  const isHost = useUserDataStore(state => state.isHost);
  return isHost ? <LeaderboardHost /> : <LeaderboardPlayer />;
}
