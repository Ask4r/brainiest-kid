import type { WSActionMessageResponse } from "@/api/ws/models";
import { useGameDataStore } from "@/state/game-data/store";
import { useFlushAllData } from "@/state/hooks";
import { useRound1StateStore } from "@/state/round1/store";
import { useLocation, useNavigate } from "react-router";

export function useHandleWSMsg() {
  const navigate = useNavigate();

  const location = useLocation();

  const flushAllData = useFlushAllData();

  const updatePlayers = useGameDataStore(state => state.updatePlayers);
  const updatePlayerScore = useGameDataStore(state => state.updatePlayerScore);
  const startNextRound = useGameDataStore(state => state.startNextRound);
  const startNextMode = useGameDataStore(state => state.startNextMode);

  const round1SetNextQuestion = useRound1StateStore(state => state.setNextQuestion);
  const round1ShowQuestion = useRound1StateStore(state => state.showQuestion);
  const round1ShowAnswer = useRound1StateStore(state => state.showAnswer);

  return (msg: WSActionMessageResponse) => {
    switch (msg.action) {
      case "let-in":
      case "swap":
      case "kick":
      case "left":
        break;
      case "abort":
        flushAllData();
        navigate("/");
        break;
      case "update-players":
        updatePlayers(msg.data.map(p => ({
          playerId: p.id,
          playerName: p.name,
          playerTurn: p.turn,
          playerScore: p.score,
          playerState: p.state,
        })));
        break;
      case "next-round":
        startNextRound();
        navigate("/game");
        break;
      case "next-mode":
        startNextMode(msg.data.mode);
        break;
      case "decoder:finished":
        // TODO
        break;
      case "tiebreak:finished":
        // TODO
        break;
      case "players-eliminated":
        // TODO
        break;
      case "show-leaderboard":
        navigate("/leaderboard");
        break;

      // Round 1
      case "round1:next-question":
        if (location.pathname !== "/game") {
          navigate("/game");
        }
        round1SetNextQuestion(msg.data.question);
        break;
      case "round1:answered":
        updatePlayerScore(msg.data.player_id, msg.data.is_correct ? 1 : 0);
        break;
      case "round1:show-question":
        round1ShowQuestion();
        break;
      case "round1:show-answer":
        round1ShowAnswer();
        break;
      case "round1:extra-questions":
        // TODO
        break;

      // Round 2
      case "round2:show-categories":
        // TODO
        break;
      case "round2:start-category":
        // TODO
        break;
      case "round2:next-question":
        // TODO
        break;
      case "round2:category-answered":
        // TODO
        break;
      case "round2:question-skip":
        // TODO
        break;

      // Round 3
      case "round3:assign-order":
        // TODO
        break;
      case "round3:assign-categories":
        // TODO
        break;
      case "round3:show-categories":
        // TODO
        break;
      case "round3:select-cell":
        // TODO
        break;
      case "round3:cell-answered":
        // TODO
        break;
      case "round3:finish-round":
        // TODO
        break;
    };
  };
}
