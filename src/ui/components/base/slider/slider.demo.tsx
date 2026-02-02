"use client";

import { Slider } from "@/ui/components/base/slider/slider";

export function Default() {
    return <Slider defaultValue={[0, 25]} />;
}

export function BottomLabel() {
    return <Slider defaultValue={[0, 25]} labelPosition="bottom" />;
}

export function TopFloating() {
    return <Slider defaultValue={[0, 25]} labelPosition="top-floating" />;
}

export function SingleThumb() {
    return <Slider defaultValue={50} labelPosition="top-floating" />;
}
