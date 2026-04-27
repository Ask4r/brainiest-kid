import type { FC } from "react";
import * as Buttons from "./social-buttons.demo";

export default {
  title: "Base components/Buttons",
  excludeStories: ["GoogleLogo", "GoogleButton", "FacebookButton", "AppleButton"],
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function SocialButtons() {
  return <Buttons.SocialButtons />;
}
SocialButtons.storyName = "Social buttons";

export function SocialButtonGroups() {
  return <Buttons.SocialButtonGroupsMD />;
}
SocialButtonGroups.storyName = "Social button groups md";

export function SocialButtonGroupsLG() {
  return <Buttons.SocialButtonGroupsLG />;
}
SocialButtonGroupsLG.storyName = "Social button groups lg";
