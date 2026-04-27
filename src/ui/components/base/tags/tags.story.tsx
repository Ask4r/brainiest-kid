import type { FC } from "react";
import * as Tags from "@/ui/components/base/tags/tags.demo";

export default {
  title: "Base components/Tags",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full overflow-auto bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function Default() {
  return <Tags.Default />;
}

export function CloseX() {
  return <Tags.CloseX />;
}

export function Count() {
  return <Tags.Count />;
}

export function CheckboxDefault() {
  return <Tags.CheckboxDefault />;
}
CheckboxDefault.storyName = "Checkbox default";

export function CheckboxCloseX() {
  return <Tags.CheckboxCloseX />;
}
CheckboxCloseX.storyName = "Checkbox close X";

export function CheckboxCount() {
  return <Tags.CheckboxCount />;
}
CheckboxCount.storyName = "Checkbox count";
