import type { FC } from "react";
import * as BadgeGroup from "@/ui/components/base/badges/badge-groups.demo";

export default {
  title: "Base components/Badge groups",
  decorators: [
    (Story: FC) => (
      <div className="flex h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function PillColorLeading() {
  return <BadgeGroup.PillColorLeading />;
}
PillColorLeading.storyName = "Pill color leading";

export function PillColorTrailing() {
  return <BadgeGroup.PillColorTrailing />;
}
PillColorTrailing.storyName = "Pill color trailing";

export function BadgeModernLeading() {
  return <BadgeGroup.BadgeModernLeading />;
}
BadgeModernLeading.storyName = "Badge modern leading";

export function BadgeModernTrailing() {
  return <BadgeGroup.BadgeModernTrailing />;
}
BadgeModernTrailing.storyName = "Badge modern trailing";
