"use client";

import { Toggle } from "@/ui/components/base/toggle/toggle";

export function DefaultDemo() {
  return <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />;
}

export function BaseDemo() {
  return <Toggle size="sm" />;
}

export function WithLabelDemo() {
  return <Toggle label="Remember me" size="sm" />;
}

export function WithLabelAndHintDemo() {
  return <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />;
}

export function DisabledDemo() {
  return <Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />;
}

export function SizesDemo() {
  return <div className="flex flex-col gap-8">
    <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
    <Toggle label="Remember me" hint="Save my login details for next time." size="md" />
  </div>;
}

export function SlimBaseDemo() {
  return <Toggle slim size="sm" />;
}

export function SlimWithLabelAndHintDemo() {
  return <Toggle slim label="Remember me" hint="Save my login details for next time." size="sm" />;
}

export function Toggles() {
  return <div className="grid grid-cols-2 gap-8">
    <div className="flex flex-col gap-4">
      <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
      <Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />
    </div>
    <div className="flex flex-col gap-4">
      <Toggle label="Remember me" hint="Save my login details for next time." size="md" />
      <Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="md" />
    </div>
  </div>;
}

export function ToggleBase() {
  return <div className="grid grid-cols-2 gap-8">
    <div className="flex flex-col gap-4">
      <Toggle size="sm" />
      <Toggle isDisabled size="sm" />
    </div>
    <div className="flex flex-col gap-4">
      <Toggle size="md" />
      <Toggle isDisabled size="md" />
    </div>
  </div>;
}

export function TogglesSlim() {
  return <div className="grid grid-cols-2 gap-8">
    <div className="flex flex-col gap-4">
      <Toggle slim label="Remember me" hint="Save my login details for next time." size="sm" />
      <Toggle slim isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />
    </div>
    <div className="flex flex-col gap-4">
      <Toggle slim label="Remember me" hint="Save my login details for next time." size="md" />
      <Toggle slim isDisabled label="Remember me" hint="Save my login details for next time." size="md" />
    </div>
  </div>;
}

export function ToggleSlimBase() {
  return <div className="grid grid-cols-2 gap-8">
    <div className="flex flex-col gap-4">
      <Toggle slim size="sm" />
      <Toggle slim isDisabled size="sm" />
    </div>
    <div className="flex flex-col gap-4">
      <Toggle slim size="md" />
      <Toggle slim isDisabled size="md" />
    </div>
  </div>;
}
