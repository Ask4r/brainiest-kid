import type { GameDataState, PlayerDataState } from "./models";

function getLastScore(players: PlayerDataState[], passPlayers: number) {
  return players.filter(p => p.playerState !== "eliminated").sort((p1, p2) => p2.playerScore - p1.playerScore)[passPlayers - 1].playerScore;
}

export function getPassPlayersByRound(round: number) {
  switch (round) {
    case 0: return 12;
    case 1: return 6;
    case 2: return 1; // return 3;
    case 3: return 1;
  }
  return 0;
}

export function getOpposingPlayers(players: PlayerDataState[], passPlayers: number) {
  const lastScore = getLastScore(players, passPlayers);
  return players.filter(p => p.playerScore === lastScore);
}

export function getDefinetlyEliminatedPlayers(players: PlayerDataState[], passPlayers: number) {
  const lastScore = getLastScore(players, passPlayers);
  return players.filter(p => p.playerScore < lastScore);
}

export function getDefinetlyPassPlayers(players: PlayerDataState[], passPlayers: number) {
  const lastScore = getLastScore(players, passPlayers);
  return players.filter(p => p.playerScore > lastScore);
}

export function getOrderedPlayersByTurn(players: PlayerDataState[]) {
  return players.filter(p => p.playerState !== "eliminated").sort((p1, p2) => {
    if (p1.playerTurn === -1) {
      return 1; // Players with turn -1 take last turn (they shouldn't play actually).
    }
    return p1.playerTurn - p2.playerTurn;
  });
}

export function getCurrentTiebreakData(gameData: GameDataState, round: number) {
  switch (round) {
    case 1: return gameData.round1.tiebreak;
    case 2: return gameData.round2.tiebreak;
    case 0:
    case 3:
      throw new Error("ERROR: Tiebreak for current round does not exist.");
    default:
      throw new Error("ERROR: Unexpected round for tiebreak.");
  }
}

export function getCurrentDecoderData(gameData: GameDataState, round: number) {
  switch (round) {
    case 2: return gameData.round2.decoder;
    case 3: return gameData.round3.decoder;
    case 0:
    case 1:
      throw new Error("ERROR: Decoder for current round does not exist.");
    default:
      throw new Error("ERROR: Unexpected round for decoder.");
  }
}
