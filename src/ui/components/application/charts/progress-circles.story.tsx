import type { FC } from "react";
import * as Charts from "./progress-circles.demo";

export default {
  title: "Application/Charts",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen items-center justify-center bg-primary py-8">
        <div className="flex w-full items-center justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
};

export function ProgressCircleXs() {
  return <Charts.ProgressCircle size="xs" title="40%" subtitle="Active users" />;
}
ProgressCircleXs.storyName = "Progress circle xs";
export function ProgressCircleSm() {
  return <Charts.ProgressCircle title="40%" subtitle="Active users" />;
}
ProgressCircleSm.storyName = "Progress circle sm";
export function ProgressCircleMd() {
  return <Charts.ProgressCircle size="md" title="40%" subtitle="Active users" />;
}
ProgressCircleMd.storyName = "Progress circle md";
export function ProgressCircleLg() {
  return <Charts.ProgressCircle size="lg" title="40%" subtitle="Active users" />;
}
ProgressCircleLg.storyName = "Progress circle lg";

export function ProgressCircleXsOnlyTitle() {
  return <Charts.ProgressCircle size="xs" title="40%" />;
}
ProgressCircleXsOnlyTitle.storyName = "Progress circle xs only title";
export function ProgressCircleSmOnlyTitle() {
  return <Charts.ProgressCircle size="sm" title="40%" />;
}
ProgressCircleSmOnlyTitle.storyName = "Progress circle sm only title";
export function ProgressCircleMdOnlyTitle() {
  return <Charts.ProgressCircle size="md" title="40%" />;
}
ProgressCircleMdOnlyTitle.storyName = "Progress circle md only title";
export function ProgressCircleLgOnlyTitle() {
  return <Charts.ProgressCircle size="lg" title="40%" />;
}
ProgressCircleLgOnlyTitle.storyName = "Progress circle lg only title";
