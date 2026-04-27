import type { FC } from "react";
import * as PinInputs from "@/ui/components/base/input/pin-input.demo";

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

export function InputOTPSM() {
  return <PinInputs.InputOTPSM />;
}
InputOTPSM.storyName = "Input OTP SM";

export function InputOTPMD() {
  return <PinInputs.InputOTPMD />;
}
InputOTPMD.storyName = "Input OTP MD";

export function InputOTPLG() {
  return <PinInputs.InputOTPLG />;
}
InputOTPLG.storyName = "Input OTP LG";

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
