import type { FC } from "react";
import * as Tooltips from "@/ui/components/base/tooltip/tooltip.demo";

export default {
    title: "Base components/Tooltips",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen items-center justify-center bg-primary p-16">
                <Story />
            </div>
        ),
    ],
};

export function Tooltip() {
    return <Tooltips.TooltipDemo />;
}

export function TooltipWithArrow() {
    return <Tooltips.TooltipWithArrow />;
}
TooltipWithArrow.storyName = "Tooltip with arrow";

export function TooltipWithArrowSupportingText() {
    return <Tooltips.TooltipWithArrowSupportingText />;
}
TooltipWithArrowSupportingText.storyName = "Tooltip with arrow supporting text";
