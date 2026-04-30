import { useUserDataStore } from "@/state/user/store";
import { useGameDataStore } from "@/state/game-data/store";
import { lazy } from "react";

const Round1Host = lazy(() => import("@/app/pages/game/round1/Round1Host"));
const Round1Player = lazy(() => import("@/app/pages/game/round1/Round1Player"));

const Round2Host = lazy(() => import("@/app/pages/game/round2/Round2Host"));
const Round2Player = lazy(() => import("@/app/pages/game/round2/Round2Player"));

const Round3Host = lazy(() => import("@/app/pages/game/round3/Round3Host"));
const Round3Player = lazy(() => import("@/app/pages/game/round3/Round3Player"));

const DecoderHost = lazy(() => import("@/app/pages/game/decoder/DecoderHost"));
const DecoderPlayer = lazy(() => import("@/app/pages/game/decoder/DecoderPlayer"));

const TiebreakHost = lazy(() => import("@/app/pages/game/tiebreak/TiebreakHost"));
const TiebreakPlayer = lazy(() => import("@/app/pages/game/tiebreak/TiebreakPlayer"));

export default function GamePage() {
  const isHost = useUserDataStore(state => state.isHost);

  const currentRound = useGameDataStore(state => state.currentRound);
  const currentMode = useGameDataStore(state => state.currentMode);

  return (
    <>
      {isHost ? (
        <>
          {currentMode === "tiebreak" ? (
            <TiebreakHost />
          ) : currentMode === "decoder" ? (
            <DecoderHost />
          ) : (
            <>
              {currentRound === 1 ? (
                <Round1Host />
              ) : currentRound === 2 ? (
                <Round2Host />
              ) : (
                <Round3Host />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {currentMode === "tiebreak" ? (
            <TiebreakPlayer />
          ) : currentMode === "decoder" ? (
            <DecoderPlayer />
          ) : (
            <>
              {currentRound === 1 ? (
                <Round1Player />
              ) : currentRound === 2 ? (
                <Round2Player />
              ) : (
                <Round3Player />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
