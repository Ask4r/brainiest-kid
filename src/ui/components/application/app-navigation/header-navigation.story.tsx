import { withOverlayAware } from "@/ui/components/internal/decorators";
import * as Demos from "./header-navigation.demo";

export default {
  title: "Application/Application navigation",
  decorators: [
    withOverlayAware((Story) => (
      <div className="min-h-screen w-full bg-primary">
        <Story />
      </div>
    )),
  ],
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

export function HeaderNavigationTabsDemo() {
  return <Demos.HeaderNavigationTabsDemo />;
}
HeaderNavigationTabsDemo.storyName = "Header navigation tabs";
HeaderNavigationTabsDemo.parameters = {
  design: {
    desktop: "11910-608084",
  },
};

export function HeaderNavigationCenteredDemo() {
  return <Demos.HeaderNavigationCenteredDemo />;
}
HeaderNavigationCenteredDemo.storyName = "Header navigation centered";
HeaderNavigationCenteredDemo.parameters = {
  design: {
    desktop: "11910-613771",
  },
};
