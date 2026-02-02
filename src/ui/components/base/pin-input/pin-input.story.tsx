import type { FC } from "react";
import * as PinInputs from "@/ui/components/base/pin-input/pin-input.demo";

export default {
    title: "Base components/Inputs/Verification code input",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen w-full bg-primary p-4">
                <Story />
            </div>
        ),
    ],
};

export function VerificationCodeInputSm() {
    return <PinInputs.VerificationCodeInputSM />;
}
VerificationCodeInputSm.storyName = "Verification code input sm";

export function VerificationCodeInputMd() {
    return <PinInputs.VerificationCodeInputMD />;
}
VerificationCodeInputMd.storyName = "Verification code input md";

export function VerificationCodeInputLg() {
    return <PinInputs.VerificationCodeInputLG />;
}
VerificationCodeInputLg.storyName = "Verification code input lg";
