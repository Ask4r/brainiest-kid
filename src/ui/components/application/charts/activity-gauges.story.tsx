import type { FC } from "react";
import * as Charts from "./activity-gauges.demo";

export default {
    title: "Application/Charts",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen items-center justify-center bg-primary py-8">
                <div className="flex w-full items-center justify-center">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export function ActivityGaugeXs() {
    return <Charts.ActivityGauge size="xs" />;
}
ActivityGaugeXs.storyName = "Activity gauge xs";

export function ActivityGaugeSm() {
    return <Charts.ActivityGauge />;
}
ActivityGaugeSm.storyName = "Activity gauge sm";

export function ActivityGaugeMd() {
    return <Charts.ActivityGauge size="md" />;
}
ActivityGaugeMd.storyName = "Activity gauge md";

export function ActivityGaugeLg() {
    return <Charts.ActivityGauge size="lg" />;
}
ActivityGaugeLg.storyName = "Activity gauge lg";
