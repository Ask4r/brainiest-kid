import { useUserDataStore } from "@/state/user/store";
import { useGameDataStore } from "@/state/game-data/store";
import { lazy } from "react";
import { Navigate } from "react-router";

const Round1Host = lazy(() => import("@/app/pages/game/round1/Round1Host"));
const Round1Player = lazy(() => import("@/app/pages/game/round1/Round1Player"));

const Round2Host = lazy(() => import("@/app/pages/game/round2/Round2Host"));
const Round2Player = lazy(() => import("@/app/pages/game/round2/Round2Player"));

// const Round3Host = lazy(() => import("@/app/pages/game/round3/Round3Host"));
// const Round3Player = lazy(() => import("@/app/pages/game/round3/Round3Player"));

const DecoderHost = lazy(() => import("@/app/pages/game/decoder/DecoderHost"));
const DecoderPlayer = lazy(() => import("@/app/pages/game/decoder/DecoderPlayer"));

const TiebreakHost = lazy(() => import("@/app/pages/game/tiebreak/TiebreakHost"));
const TiebreakPlayer = lazy(() => import("@/app/pages/game/tiebreak/TiebreakPlayer"));

export default function GamePage() {
  const isHost = useUserDataStore(state => state.isHost);

  const currentRound = useGameDataStore(state => state.currentRound);
  const currentMode = useGameDataStore(state => state.currentMode);
  const setIsFinished = useGameDataStore(state => state.setIsFinished);


  if (currentRound === 3) {
    setIsFinished(true);
    return <Navigate to="/results" />;
  }

  if (isHost) {

    if (currentMode === "tiebreak") {
      return <TiebreakHost />;
    }
    if (currentMode === "decoder") {
      return <DecoderHost />;
    }

    if (currentRound === 1) {
      return <Round1Host />;
    }
    if (currentRound === 2) {
      return <Round2Host />;
    }

    return <Navigate to="/results" />;

  } else {
    if (currentMode === "tiebreak") {
      return <TiebreakPlayer />;
    }
    if (currentMode === "decoder") {
      return <DecoderPlayer />;
    }

    if (currentRound === 1) {
      return <Round1Player />;
    }
    if (currentRound === 2) {
      return <Round2Player />;
    }

    return <Navigate to="/results" />;
  }
}

