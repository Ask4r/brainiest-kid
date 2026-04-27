import type { FC } from "react";
import * as Checkbox from "@/ui/components/base/checkbox/checkbox.demo";

export default {
  title: "Base components/Checkboxes",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen w-full bg-primary p-4">
        <Story />
      </div>
    ),
  ],
};

export function Checkboxes() {
  return <Checkbox.Checkboxes />;
}

export function CheckboxBase() {
  return <Checkbox.CheckboxBase />;
}
CheckboxBase.storyName = "Checkbox base";
