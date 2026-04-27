import { useRound1StateStore } from "@/state/round1/store";
import { ProgressBarCircle } from "@/ui/components/base/progress-indicators/progress-circles";
import { useEffect, useRef } from "react";

interface Props {
  maxSecs: number;
  isActive: boolean;
};

function formatter(remSecs: number, _percentage: number) {
  const mins = Math.floor(remSecs / 60);
  const secs = remSecs % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function Timer(props: Props) {
  const intervalRef = useRef<number | undefined>(undefined);

  const remSecs = useRound1StateStore(state => state.timerRemSecs);
  const decRemSecs = useRound1StateStore(state => state.decTimer);

  useEffect(() => {
    if (!props.isActive) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      return;
    }
    if (remSecs > 0 && intervalRef.current === undefined) {
      intervalRef.current = setInterval(decRemSecs, 1000);
      return;
    }
    if (remSecs <= 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      return;
    }
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, [decRemSecs, props, remSecs]);

  return (
    <ProgressBarCircle
      size="xs"
      label="Осталось"
      min={0}
      max={props.maxSecs}
      value={remSecs}
      valueFormatter={formatter}
    />
  );
}
