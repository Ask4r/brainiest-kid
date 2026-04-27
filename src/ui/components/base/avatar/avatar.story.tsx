import type { FC } from "react";
import * as Avatar from "@/ui/components/base/avatar/avatar.demo";

export default {
  title: "Base components/Avatars",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function Group() {
  return <Avatar.Group />;
}

export function Default() {
  return <Avatar.Default />;
}

export function WithBorder() {
  return <Avatar.WithBorder />;
}
WithBorder.storyName = "With border";

export function Placeholder() {
  return <Avatar.Placeholder />;
}

export function Initials() {
  return <Avatar.Initials />;
}

export function LabelGroup() {
  return <Avatar.LabelGroup />;
}
LabelGroup.storyName = "Label group";

export function ProfilePhoto() {
  return <Avatar.ProfilePhoto />;
}
ProfilePhoto.storyName = "Profile photo";
