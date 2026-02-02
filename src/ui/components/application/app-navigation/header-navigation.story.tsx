import { withOverlayAware } from "@/ui/components/internal/decorators";
import * as Demos from "./header-navigation.demo";

export default {
    title: "Application/Application navigation",
    decorators: [withOverlayAware((Story, context) => <div className="min-h-screen w-full bg-primary">{Story(context, context)}</div>)],
};

export function HeaderNavigationSimpleDemo() {
    return <Demos.HeaderNavigationSimpleDemo />;
}
HeaderNavigationSimpleDemo.storyName = "Header navigation simple";
HeaderNavigationSimpleDemo.parameters = {
    design: {
        desktop: "1208-104342",
    },
};

export function HeaderNavigationDualTierDemo() {
    return <Demos.HeaderNavigationDualTierDemo />;
}
HeaderNavigationDualTierDemo.storyName = "Header navigation dual-tier";
HeaderNavigationDualTierDemo.parameters = {
    design: {
        desktop: "1208-101427",
    },
};
