import { Box, IconButton, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import React, { MutableRefObject, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "keen-slider/keen-slider.min.css";

import { DetailSpotResponse } from "../../types";
import { Dailys } from "../Dailys";
import { ListWithVerticalLine } from "../ListWithVerticalLine";
import { MapContainer } from "../MapContainer";

const ThumbnailPlugin = (
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin => {
  return (slider) => {
    const removeActive = () => {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    };
    const addActive = (idx: number) => {
      slider.slides[idx].classList.add("active");
    };

    const addClickEvents = () => {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    };

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        if (next < main.track.details.length) {
          addActive(next);
          slider.moveToIdx(next);
        }
      });
    });
  };
};

type DailyCarouselWithInfosProps = {
  spotResponseList: DetailSpotResponse[];
  totalDays: number;
};

export const DailyCarouselWithInfos = ({
  spotResponseList,
  totalDays,
}: DailyCarouselWithInfosProps) => {
  console.log(spotResponseList);
  const perView = useBreakpointValue({
    xs: 2,
    base: 3,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
    "2xl": 12,
    "3xl": 14,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: perView,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <MapContainer
        dailyPlaces={spotResponseList.filter(
          (spotResponseList) => spotResponseList.dateOrder === currentSlide + 1
        )}
      />

      <Flex direction="column-reverse">
        <Box
          className="keen-slider"
          ref={sliderRef}
          bg="gray.100"
          p="8"
          borderTopRadius="xl"
          position={"relative"}
        >
          {/* Left Icon */}
          <IconButton
            aria-label="left-arrow"
            variant="ghost"
            position="absolute"
            left="0.25rem"
            top="50%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          >
            <IoChevronBack size="2rem" />
          </IconButton>

          {/* Right Icon */}
          <IconButton
            aria-label="right-arrow"
            variant="ghost"
            position="absolute"
            right="0.25rem"
            top="50%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide + 1 ===
              instanceRef.current?.track.details.slides.length
            }
          >
            <IoChevronForward size="2rem" />
          </IconButton>

          {/* Slides */}
          {Array.from({ length: totalDays }, (_, idx) => idx).map((idx) => (
            <ListWithVerticalLine
              key={`ListWithVerticalLine-${idx}`}
              idx={idx}
              dailyPlaces={spotResponseList}
              className={"keen-slider__slide"}
            />
          ))}
        </Box>

        {/*Thumbnails */}
        <Box ref={thumbnailRef} className="keen-slider thumbnail" mb="4">
          <Dailys
            totalDays={totalDays}
            selectedDateIdx={currentSlide}
            setSelectedDateIdx={() => {}}
            dailyPlaces={spotResponseList}
            className="keen-slider__slide"
          />
        </Box>
      </Flex>
    </>
  );
};
