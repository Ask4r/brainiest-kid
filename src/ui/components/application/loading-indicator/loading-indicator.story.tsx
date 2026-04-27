import type { FC } from "react";
import * as Demos from "./loading-indicator.demo";

export default {
  title: "Application/Loading indicators",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen items-center justify-center bg-primary p-8">
        <Story />
      </div>
    ),
  ],
};

export function LoadingIndicatorLineSimple() {
  return <Demos.LoadingIndicatorLineSimple />;
}
LoadingIndicatorLineSimple.storyName = "Loading indicator line simple";

export function LoadingIndicatorLineSpinner() {
  return <Demos.LoadingIndicatorLineSpinner />;
}
LoadingIndicatorLineSpinner.storyName = "Loading indicator line spinner";

export function LoadingIndicatorDotCircle() {
  return <Demos.LoadingIndicatorDotCircle />;
}
LoadingIndicatorDotCircle.storyName = "Loading indicator dot circle";
