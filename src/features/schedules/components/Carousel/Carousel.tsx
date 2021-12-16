import { Box } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import { Children, cloneElement, PropsWithChildren } from "react";
import "keen-slider/keen-slider.min.css";

import { getValidChildren } from "@/utils/children";

type Sizes = "sm" | "md" | "lg" | "2xl" | "3xl";

type CarouselProps = PropsWithChildren<{
  perViewInfo?: Partial<Record<Sizes | "base", number>>;
  spacing?: number;
}>;

const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      slider.update();
    });
  });
  const config = { childList: true };

  slider.on("created", () => {
    observer.observe(slider.container, config);
  });
  slider.on("destroyed", () => {
    observer.disconnect();
  });
};

export const Carousel = (props: CarouselProps) => {
  const { perViewInfo = { base: 1 }, spacing = 10, children } = props;

  const perView = useBreakpointValue(perViewInfo);
  const validChildren = getValidChildren(children);
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView,
        spacing,
      },
    },
    [MutationPlugin]
  );

  return (
    <Box ref={sliderRef} className="keen-slider">
      {Children.map(validChildren, (child) => {
        return cloneElement(child, { className: "keen-slider__slide" });
      })}
    </Box>
  );
};
