"use client";

import { PinInput } from "@/ui/components/base/pin-input/pin-input";

export function FourDigitsDemo() {
    return (
        <PinInput>
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={4}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
}

export function DisabledDemo() {
    return (
        <PinInput disabled>
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={4}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
}

export function SizesDemo() {
    return (
        <div className="flex flex-col gap-8">
            <PinInput size="sm">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>

            <PinInput size="md">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>

            <PinInput size="lg">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>
        </div>
    );
}

export function VerificationCodeInputSM() {
    return (
        <PinInput size="sm">
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={6}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Separator />
                <PinInput.Slot index={3} />
                <PinInput.Slot index={4} />
                <PinInput.Slot index={5} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
}

export function VerificationCodeInputMD() {
    return (
        <PinInput size="md">
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={6}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Separator />
                <PinInput.Slot index={3} />
                <PinInput.Slot index={4} />
                <PinInput.Slot index={5} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
}

export function VerificationCodeInputLG() {
    return (
        <PinInput size="lg">
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={6}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Separator />
                <PinInput.Slot index={3} />
                <PinInput.Slot index={4} />
                <PinInput.Slot index={5} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
}
