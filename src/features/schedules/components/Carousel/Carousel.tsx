import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import { Children, cloneElement, PropsWithChildren } from "react";

import { getValidChildren } from "@/utils/children";

type Sizes = "sm" | "md" | "lg" | "2xl" | "3xl";

type CarouselProps = PropsWithChildren<{
  perViewInfo?: Partial<Record<Sizes | "base", number>>;
  spacing?: number;
}>;

export const Carousel = (props: CarouselProps) => {
  const { perViewInfo = { base: 1 }, spacing = 10, children } = props;

  const validChildren = getValidChildren(children);
  const perView = useBreakpointValue(perViewInfo);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView,
      spacing,
    },
  });

  return (
    <Box ref={sliderRef} className="keen-slider">
      {Children.map(validChildren, (child) => {
        return cloneElement(child, { className: "keen-slider__slide" });
      })}
    </Box>
  );
};
