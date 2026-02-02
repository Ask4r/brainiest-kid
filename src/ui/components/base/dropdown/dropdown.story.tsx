import type { FC } from "react";
import * as Dropdowns from "@/ui/components/base/dropdown/dropdown.demo";

export default {
    title: "Base components/Dropdowns",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full items-start justify-center bg-primary p-8">
                <Story />
            </div>
        ),
    ],
};

export function DropdownButton() {
    return <Dropdowns.DropdownButton />;
}
DropdownButton.storyName = "Dropdown button";

export function DropdownIcon() {
    return <Dropdowns.DropdownIcon />;
}
DropdownIcon.storyName = "Dropdown icon";

export function DropdownAvatar() {
    return <Dropdowns.DropdownAvatar />;
}
DropdownAvatar.storyName = "Dropdown avatar";
