import type { FC } from "react";
import * as Demos from "./tabs.demo";

export default {
    title: "Application/Tabs",
    decorators: [
        (Story: FC) => (
            <div className="flex min-h-screen items-center justify-center bg-primary p-8">
                <Story />
            </div>
        ),
    ],
};

export function ButtonBrandHorizontal() {
    return <Demos.ButtonBrandHorizontal />;
}
ButtonBrandHorizontal.storyName = "Button brand horizontal";

export function ButtonBrandVertical() {
    return <Demos.ButtonBrandVertical />;
}
ButtonBrandVertical.storyName = "Button brand vertical";

export function ButtonGrayHorizontal() {
    return <Demos.ButtonGrayHorizontal />;
}
ButtonGrayHorizontal.storyName = "Button gray horizontal";

export function ButtonGrayVertical() {
    return <Demos.ButtonGrayVertical />;
}
ButtonGrayVertical.storyName = "Button gray vertical";

export function UnderlineHorizontal() {
    return <Demos.UnderlineHorizontal />;
}
UnderlineHorizontal.storyName = "Underline horizontal";

export function UnderlineVertical() {
    return <Demos.UnderlineVertical />;
}
UnderlineVertical.storyName = "Underline vertical";

export function ButtonBorderHorizontal() {
    return <Demos.ButtonBorderHorizontal />;
}
ButtonBorderHorizontal.storyName = "Button border horizontal";

export function ButtonBorderVertical() {
    return <Demos.ButtonBorderVertical />;
}
ButtonBorderVertical.storyName = "Button border vertical";

export function ButtonMinimalHorizontal() {
    return <Demos.ButtonMinimalHorizontal />;
}
ButtonMinimalHorizontal.storyName = "Button minimal horizontal";

export function ButtonMinimalVertical() {
    return <Demos.ButtonMinimalVertical />;
}
ButtonMinimalVertical.storyName = "Button minimal vertical";
