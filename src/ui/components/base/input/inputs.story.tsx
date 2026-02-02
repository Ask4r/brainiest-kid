import type { FC } from "react";
import * as Inputs from "@/ui/components/base/input/inputs.demo";

export default {
    title: "Base components/Inputs",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

function DefaultDecorator(Story: FC) {
    return (
        <div className="w-full max-w-xs">
            <Story />
        </div>
    );
}

function WiderDecorator(Story: FC) {
    return (
        <div className="w-full max-w-100">
            <Story />
        </div>
    );
}

export function Default() {
    return <Inputs.Default />;
}
Default.decorators = [DefaultDecorator];

export function LeadingIcon() {
    return <Inputs.LeadingIcon />;
}
LeadingIcon.decorators = [DefaultDecorator];
LeadingIcon.storyName = "Leading icon";

export function LeadingDropdown() {
    return <Inputs.LeadingDropdown />;
}
LeadingDropdown.decorators = [DefaultDecorator];
LeadingDropdown.storyName = "Leading dropdown";

export function TrailingDropdown() {
    return <Inputs.TrailingDropdown />;
}
TrailingDropdown.decorators = [DefaultDecorator];
TrailingDropdown.storyName = "Trailing dropdown";

export function LeadingText() {
    return <Inputs.LeadingText />;
}
LeadingText.decorators = [DefaultDecorator];
LeadingText.storyName = "Leading text";

export function PaymentInputs() {
    return <Inputs.PaymentInputs />;
}
PaymentInputs.decorators = [DefaultDecorator];
PaymentInputs.storyName = "Payment inputs";

export function TrailingButton() {
    return <Inputs.TrailingButton />;
}
TrailingButton.decorators = [WiderDecorator];
TrailingButton.storyName = "Trailing button";
