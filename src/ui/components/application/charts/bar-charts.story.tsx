import type { FC } from "react";
import * as Charts from "./bar-charts.demo";

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

export function BarChart() {
    return (
        <div className="w-full max-w-7xl">
            <Charts.BarChart />
        </div>
    );
}
BarChart.storyName = "Bar chart";

export function BarChart02() {
    return (
        <div className="w-full max-w-7xl">
            <Charts.BarChart02 />
        </div>
    );
}
BarChart02.storyName = "Bar chart 02";

export function BarChart03() {
    return (
        <div className="w-full max-w-7xl">
            <Charts.BarChart03 />
        </div>
    );
}
BarChart03.storyName = "Bar chart 03";
