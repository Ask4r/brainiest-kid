import { useUserDataStore } from "@/state/user/store";
import { type PropsWithChildren } from "react";
import { NoActiveSessionScreen } from "../components/NoActiveSessionScreen";

export function SessionStateGuard({ children }: PropsWithChildren) {
  const sessionCode = useUserDataStore(state => state.sessionCode);
  return sessionCode === 0 ? <NoActiveSessionScreen /> : children;
}
