import type { FC } from "react";
import * as Carousels from "./carousel.demo";

export default {
  title: "Application/Carousels",
  decorators: [
    (Story: FC) => (
      <div className="flex min-h-screen items-center justify-center bg-primary p-8">
        <div>
          <Story />
        </div>
      </div>
    ),
  ],
};

export function CarouselMd() {
  return <Carousels.CarouselMd />;
}
CarouselMd.storyName = "Carousel md";

export function CarouselLg() {
  return <Carousels.CarouselLg />;
}
CarouselLg.storyName = "Carousel lg";
