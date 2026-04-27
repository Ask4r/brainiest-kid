import type { FC } from "react";
import * as ToggleComponents from "@/ui/components/base/toggle/toggle.demo";

export default {
  title: "Base components/Toggles",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function Toggles() {
  return <ToggleComponents.Toggles />;
}

export function ToggleBase() {
  return <ToggleComponents.ToggleBase />;
}
ToggleBase.storyName = "Toggle base";
export function TogglesSlim() {
  return <ToggleComponents.TogglesSlim />;
}
TogglesSlim.storyName = "Toggles slim";

export function ToggleSlimBase() {
  return <ToggleComponents.ToggleSlimBase />;
}
ToggleSlimBase.storyName = "Toggle slim base";
