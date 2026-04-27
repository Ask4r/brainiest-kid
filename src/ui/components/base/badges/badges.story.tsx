import type { FC } from "react";
import * as Badges from "@/ui/components/base/badges/badges.demo";

export default {
  title: "Base components/Badges",
  decorators: [
    (Story: FC) => (
      <div className="flex h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function PillColor() {
  return <Badges.PillColor />;
}
PillColor.storyName = "Pill color";

export function BadgeColor() {
  return <Badges.BadgeColor />;
}
BadgeColor.storyName = "Badge color";

export function BadgeModern() {
  return <Badges.BadgeModern />;
}
BadgeModern.storyName = "Badge modern";

export function WithDot() {
  return <Badges.WithDot />;
}
WithDot.storyName = "With dot";

export function WithDotBadgeColor() {
  return <Badges.WithDotBadgeColor />;
}
WithDotBadgeColor.storyName = "With dot badge color";

export function WithDotBadgeModern() {
  return <Badges.WithDotBadgeModern />;
}
WithDotBadgeModern.storyName = "With dot badge modern";

export function WithFlag() {
  return <Badges.WithFlag />;
}
WithFlag.storyName = "With flag";

export function WithFlagBadgeColor() {
  return <Badges.WithFlagBadgeColor />;
}
WithFlagBadgeColor.storyName = "With flag badge color";

export function WithFlagBadgeModern() {
  return <Badges.WithFlagBadgeModern />;
}
WithFlagBadgeModern.storyName = "With flag badge modern";

export function WithAvatar() {
  return <Badges.WithAvatar />;
}
WithAvatar.storyName = "With avatar";

export function WithAvatarBadgeColor() {
  return <Badges.WithAvatarBadgeColor />;
}
WithAvatarBadgeColor.storyName = "With avatar badge color";

export function WithAvatarBadgeModern() {
  return <Badges.WithAvatarBadgeModern />;
}
WithAvatarBadgeModern.storyName = "With avatar badge modern";

export function WithCloseX() {
  return <Badges.WithCloseX />;
}
WithCloseX.storyName = "With close X";

export function WithCloseXBadgeColor() {
  return <Badges.WithCloseXBadgeColor />;
}
WithCloseXBadgeColor.storyName = "With close X badge color";
export function WithCloseXBadgeModern() {
  return <Badges.WithCloseXBadgeModern />;
}

export function WithIconTrailing() {
  return <Badges.WithIconTrailing />;
}
WithIconTrailing.storyName = "With icon trailing";

export function WithIconTrailingBadgeColor() {
  return <Badges.WithIconTrailingBadgeColor />;
}
WithIconTrailingBadgeColor.storyName = "With icon trailing badge color";

export function WithIconTrailingBadgeModern() {
  return <Badges.WithIconTrailingBadgeModern />;
}
WithIconTrailingBadgeModern.storyName = "With icon trailing badge modern";

export function WithIconLeading() {
  return <Badges.WithIconLeading />;
}
WithIconLeading.storyName = "With icon leading";

export function WithIconLeadingBadgeColor() {
  return <Badges.WithIconLeadingBadgeColor />;
}
WithIconLeadingBadgeColor.storyName = "With icon leading badge color";

export function WithIconLeadingBadgeModern() {
  return <Badges.WithIconLeadingBadgeModern />;
}
WithIconLeadingBadgeModern.storyName = "With icon leading badge modern";

export function WithIconOnly() {
  return <Badges.WithIconOnly />;
}
WithIconOnly.storyName = "With icon only";

export function WithIconOnlyBadgeColor() {
  return <Badges.WithIconOnlyBadgeColor />;
}
WithIconOnlyBadgeColor.storyName = "With icon only badge color";

export function WithIconOnlyBadgeModern() {
  return <Badges.WithIconOnlyBadgeModern />;
}
WithIconOnlyBadgeModern.storyName = "With icon only badge modern";
