import type { FC } from "react";
import * as Demos from "./featured-icon.demo";

export default {
  title: "Base components/Featured Icons",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full overflow-auto bg-primary p-8">
        <Story />
      </div>
    ),
  ],
};

export function Light() {
  return <Demos.LightDemo />;
}

export function Gradient() {
  return <Demos.GradientDemo />;
}

export function Dark() {
  return <Demos.DarkDemo />;
}

export function Modern() {
  return <Demos.ModernDemo />;
}

export function ModernNeue() {
  return <Demos.ModernNeueDemo />;
}

export function Outline() {
  return <Demos.OutlineDemo />;
}
