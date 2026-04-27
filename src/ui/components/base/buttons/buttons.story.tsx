import type { FC } from "react";
import * as Buttons from "@/ui/components/base/buttons/buttons.demo";

export default {
  title: "Base components/Buttons",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function Primary() {
  return <Buttons.Primary />;
}

export function Secondary() {
  return <Buttons.Secondary />;
}

export function Tertiary() {
  return <Buttons.Tertiary />;
}

export function LinkGray() {
  return <Buttons.LinkGray />;
}
LinkGray.storyName = "Link gray";

export function LinkColor() {
  return <Buttons.LinkColor />;
}
LinkColor.storyName = "Link color";

export function DestructivePrimary() {
  return <Buttons.PrimaryDestructive />;
}
DestructivePrimary.storyName = "Destructive primary";

export function DestructiveSecondary() {
  return <Buttons.SecondaryDestructive />;
}
DestructiveSecondary.storyName = "Destructive secondary";

export function DestructiveTertiary() {
  return <Buttons.TertiaryDestructive />;
}
DestructiveTertiary.storyName = "Destructive tertiary";

export function DestructiveLink() {
  return <Buttons.LinkDestructive />;
}
DestructiveLink.storyName = "Destructive link";

export function CloseX() {
  return <Buttons.CloseX />;
}

export function UtilityButton() {
  return <Buttons.UtilityButton />;
}
UtilityButton.storyName = "Utility button";
