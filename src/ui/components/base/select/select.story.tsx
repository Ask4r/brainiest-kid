import type { FC } from "react";
import * as Selects from "@/ui/components/base/select/select.demo";

export default {
    title: "Base components/Select",
};

function DefaultDecorator(Story: FC) {
    return (
        <div className="flex min-h-screen w-full bg-primary p-4">
            <div className="w-80">
                <Story />
            </div>
        </div>
    );
}

function WiderDecorator(Story: FC) {
    return (
        <div className="flex min-h-screen w-full bg-primary p-4">
            <div className="w-100">
                <Story />
            </div>
        </div>
    );
}

export function Default() {
    return <Selects.Default />;
}
Default.decorators = [DefaultDecorator];

export function IconLeading() {
    return <Selects.IconLeading />;
}
IconLeading.decorators = [DefaultDecorator];
IconLeading.storyName = "Icon leading";

export function AvatarLeading() {
    return <Selects.AvatarLeading />;
}
AvatarLeading.decorators = [DefaultDecorator];
AvatarLeading.storyName = "Avatar leading";

export function DotLeading() {
    return <Selects.DotLeading />;
}
DotLeading.decorators = [DefaultDecorator];
DotLeading.storyName = "Dot leading";

export function Search() {
    return <Selects.Search />;
}
Search.decorators = [DefaultDecorator];

export function Tags() {
    return <Selects.Tags />;
}
Tags.decorators = [WiderDecorator];
