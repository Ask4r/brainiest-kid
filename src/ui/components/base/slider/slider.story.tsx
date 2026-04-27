import type { FC } from "react";
import * as Sliders from "@/ui/components/base/slider/slider.demo";

export default {
  title: "Base components/Sliders",
  decorators: [
    (Story: FC) => (
      <div className="bg-primary p-16">
        <div className="max-w-xs">
          <Story />
        </div>
      </div>
    ),
  ],
};

export function Default() {
  return <Sliders.Default />;
}

export function BottomLabel() {
  return <Sliders.BottomLabel />;
}
BottomLabel.storyName = "Bottom label";

export function TopFloating() {
  return <Sliders.TopFloating />;
}
TopFloating.storyName = "Top floating";

export function SingleThumb() {
  return <Sliders.SingleThumb />;
}
SingleThumb.storyName = "Single thumb";
