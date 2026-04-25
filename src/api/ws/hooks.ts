import { useContext } from "react";
import { WSContext } from "./context";


export function useSessionWS() {
  const ctx = useContext(WSContext);
  if (ctx === null) {
    throw new Error("ERROR: Tried to use websoket, but did not connect prior.");
  }
  return ctx.ws;
}

// export type SessionWSArgs = (
//   { isHost: true; sessionCode: number; }
//   | { isHost: false; playerId: string; }
// ) & {
//   onMessage?: (msg: WSActionMessageResponse) => void;
// };
//
// function getWSURL(args: SessionWSArgs | null) {
//   if (args === null) {
//     return null;
//   }
//   if (args.isHost) {
//     return `/ws/host/${args.sessionCode}`;
//   } else {
//     return `/ws/player/${args.playerId}`;
//   }
// }
//
// export function useSessionWS(args: SessionWSArgs | null) {
//   const wsURL = getWSURL(args);
//   return useAPIWebSocket<WSActionMessageResponse>(wsURL, {
//     share: true,
//     onMessage(event) {
//       const msg = JSON.parse(event.data) as WSActionMessageResponse;
//       args?.onMessage?.(msg);
//     },
//   });
// }
//
//
// export function usePlayerSocket(playerId: string) {
//   return useAPIWebSocket<WSActionMessageResponse>(`/ws/player/${playerId}`, {
//     share: true,
//     onMessage(event) {
//       const msg = JSON.parse(event.data) as WSActionMessageResponse;
//       switch (msg.action) {
//         case "let-in": break;
//         case "swap": break;
//         case "kick": break;
//         case "abort": break;
//         case "left": break;
//         case "update-players": break;
//         case "next-round": break;
//         case "next-mode": break;
//         case "decoder:finished": break;
//         case "tiebreak:finished": break;
//         case "players-eliminated": break;
//         case "show-leaderboard": break;
//         case "round1:next-question": break;
//         case "round1:answered": break;
//         case "round1:show-answer": break;
//         case "round1:extra-questions": break;
//         case "round2:show-categories": break;
//         case "round2:start-category": break;
//         case "round2:next-question": break;
//         case "round2:category-answered": break;
//         case "round2:question-skip": break;
//         case "round3:assign-order": break;
//         case "round3:assign-categories": break;
//         case "round3:show-categories": break;
//         case "round3:select-cell": break;
//         case "round3:cell-answered": break;
//         case "round3:finish-round": break;
//       };
//     },
//   });
// }
//
