import { ProgressBarCircle } from "@/ui/components/base/progress-indicators/progress-circles";
import { useEffect, useImperativeHandle, useState, type RefObject } from "react";

interface Handles {
  reset: () => void;
};

interface Props {
  ref?: RefObject<Handles>;
  initialRemainigSecs: number;
  isActive: boolean;
  onElapsed?: () => void;
};

function formatter(remSecs: number, _percentage: number) {
  const mins = Math.floor(remSecs / 60);
  const secs = remSecs % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function Timer(props: Props) {
  const [remSecs, setRemSecs] = useState<number>(props.initialRemainigSecs);

  // eslint-disable-next-line react-hooks/refs
  useImperativeHandle(props.ref, () => ({
    reset() {
      setRemSecs(props.initialRemainigSecs);
    },
    // eslint-disable-next-line react-hooks/refs
  }), [props.initialRemainigSecs]);

  useEffect(() => {
    let interval = undefined;
    if (!props.isActive) {
      clearInterval(interval);
      return;
    }
    if (remSecs > 0) {
      interval = setInterval(() => {
        setRemSecs((prev) => prev - 1);
      }, 1000);
    } else if (remSecs <= 0) {
      clearInterval(interval);
      props.onElapsed?.();
    }
    return () => {
      clearInterval(interval);
    };
  }, [props, remSecs]);

  return (
    <ProgressBarCircle
      size="xs"
      label="Осталось"
      min={0}
      max={props.initialRemainigSecs}
      value={remSecs}
      valueFormatter={formatter}
    />
  );
}
