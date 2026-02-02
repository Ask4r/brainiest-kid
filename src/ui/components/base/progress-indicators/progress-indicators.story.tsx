import type { FC } from "react";
import * as Demos from "./progress-indicators.demo";

export default {
    title: "Base components/Progress indicators",
};

function DefaultDecorator(Story: FC) {
    return (
        <div className="flex min-h-screen w-screen bg-primary p-16">
            <div className="w-full max-w-xs">
                <Story />
            </div>
        </div>
    );
}

function WiderDecorator(Story: FC) {
    return (
        <div className="flex min-h-screen w-full bg-primary p-16">
            <div className="w-100">
                <Story />
            </div>
        </div>
    );
}

export function Default() {
    return <Demos.ProgressBarDefault />;
}
Default.decorators = [DefaultDecorator];

export function TextRight() {
    return <Demos.ProgressBarTextRight />;
}
TextRight.decorators = [DefaultDecorator];
TextRight.storyName = "Text right";

export function TextBottom() {
    return <Demos.ProgressBarTextBottom />;
}
TextBottom.decorators = [DefaultDecorator];
TextBottom.storyName = "Text bottom";

export function TextTopFloating() {
    return <Demos.ProgressBarTextTopFloating />;
}
TextTopFloating.decorators = [DefaultDecorator];
TextTopFloating.storyName = "Text top floating";

export function TextBottomFloating() {
    return <Demos.ProgressBarTextBottomFloating />;
}
TextBottomFloating.decorators = [DefaultDecorator];
TextBottomFloating.storyName = "Text bottom floating";

export function CircleProgressBar() {
    return <Demos.CircleProgressBar />;
}
CircleProgressBar.decorators = [WiderDecorator];
CircleProgressBar.storyName = "Circle progress bar";

export function CircleProgressBarLabel() {
    return <Demos.CircleProgressBarLabel />;
}
CircleProgressBarLabel.decorators = [WiderDecorator];
CircleProgressBarLabel.storyName = "Circle progress bar label";

export function HalfCircleProgressBar() {
    return <Demos.HalfCircleProgressBar />;
}
HalfCircleProgressBar.decorators = [WiderDecorator];
HalfCircleProgressBar.storyName = "Half circle progress bar";

export function HalfCircleProgressBarLabel() {
    return <Demos.HalfCircleProgressBarLabel />;
}
HalfCircleProgressBarLabel.decorators = [WiderDecorator];
HalfCircleProgressBarLabel.storyName = "Half circle progress bar label";
