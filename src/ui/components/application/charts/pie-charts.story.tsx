import type { FC } from "react";
import * as Charts from "./pie-charts.demo";

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

export function PieChartXxs() {
  return <Charts.PieChartXxs />;
}
PieChartXxs.storyName = "Pie chart xxs";

export function PieChartXs() {
  return <Charts.PieChartXs />;
}
PieChartXs.storyName = "Pie chart xs";

export function PieChartSm() {
  return <Charts.PieChartSm />;
}
PieChartSm.storyName = "Pie chart sm";

export function PieChartMd() {
  return <Charts.PieChartMd />;
}
PieChartMd.storyName = "Pie chart md";

export function PieChartLg() {
  return <Charts.PieChartLg />;
}
PieChartLg.storyName = "Pie chart lg";
