import { Box, IconButton, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import { MutableRefObject, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "keen-slider/keen-slider.min.css";

import { Dailys } from "../Dailys";
import { ListWithVerticalLine } from "../ListWithVerticalLine";

const dummy = [
  {
    date: 3,
    order: 0,
    position: { lat: "35.8293538261623", lng: "129.218109530763" },
    spotId: "1839209698",
    placeName: "월정교",
    phone: "",
    addressName: "경북 경주시 교동 274",
    roadAddressName: "",
  },
  {
    date: 0,
    order: 0,
    position: { lat: "35.7382615855879", lng: "129.486876732783" },
    spotId: "11276178",
    placeName: "경주문무대왕릉",
    phone: "",
    addressName: "경북 경주시 문무대왕면 봉길리 30-1",
    roadAddressName: "",
  },
  {
    date: 0,
    order: 0,
    position: { lat: "35.8213166189963", lng: "129.509520717781" },
    spotId: "11256465",
    placeName: "오류고아라해변",
    phone: "",
    addressName: "경북 경주시 감포읍 오류리",
    roadAddressName: "",
  },
  {
    date: 1,
    order: 0,
    position: { lat: "35.849507092525485", lng: "129.26166060389696" },
    spotId: "19464673",
    placeName: "경주동궁원",
    phone: "054-779-8725",
    addressName: "경북 경주시 북군동 185-1",
    roadAddressName: "경북 경주시 보문로 74-14",
  },
  {
    date: 1,
    order: 0,
    position: { lat: "35.8393348165945", lng: "129.209645417434" },
    spotId: "627627078",
    placeName: "황리단길",
    phone: "",
    addressName: "경북 경주시 황남동 270-10",
    roadAddressName: "경북 경주시 태종로 746",
  },
  {
    date: 1,
    order: 0,
    position: { lat: "35.8293538261623", lng: "129.218109530763" },
    spotId: "1839209698",
    placeName: "월정교",
    phone: "",
    addressName: "경북 경주시 교동 274",
    roadAddressName: "",
  },
  {
    date: 1,
    order: 0,
    position: { lat: "35.83814999833691", lng: "129.21233472051617" },
    spotId: "8288444",
    placeName: "경주대릉원",
    phone: "054-750-8650",
    addressName: "경북 경주시 황남동 268-10",
    roadAddressName: "경북 경주시 계림로 9",
  },
  {
    date: 2,
    order: 0,
    position: { lat: "35.8347762643542", lng: "129.226975518857" },
    spotId: "8179010",
    placeName: "동궁과월지",
    phone: "054-750-8655",
    addressName: "경북 경주시 인왕동 517",
    roadAddressName: "",
  },
  {
    date: 2,
    order: 0,
    position: { lat: "35.77204424085", lng: "129.084330974478" },
    spotId: "130383717",
    placeName: "화랑의언덕",
    phone: "054-751-8118",
    addressName: "경북 경주시 산내면 내일리 산 260-6",
    roadAddressName: "경북 경주시 산내면 수의길 601",
  },
  {
    date: 3,
    order: 0,
    position: { lat: "35.6860838852533", lng: "129.474229010739" },
    spotId: "27591086",
    placeName: "주상절리조망타워",
    phone: "",
    addressName: "경북 경주시 양남면 읍천리 405-7",
    roadAddressName: "경북 경주시 양남면 동해안로 498-13",
  },
  {
    date: 3,
    order: 0,
    position: { lat: "35.7382615855879", lng: "129.486876732783" },
    spotId: "11276178",
    placeName: "경주문무대왕릉",
    phone: "",
    addressName: "경북 경주시 문무대왕면 봉길리 30-1",
    roadAddressName: "",
  },
  {
    date: 4,
    order: 0,
    position: { lat: "35.7382615855879", lng: "129.486876732783" },
    spotId: "11276178",
    placeName: "경주문무대왕릉",
    phone: "",
    addressName: "경북 경주시 문무대왕면 봉길리 30-1",
    roadAddressName: "",
  },
];

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

export const DailyCarouselWithInfos = () => {
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
        {Array.from({ length: 5 }, (_, idx) => idx).map((idx) => (
          <ListWithVerticalLine
            key={`ListWithVerticalLine-${idx}`}
            idx={idx}
            dailyPlaces={dummy}
            className={"keen-slider__slide"}
          />
        ))}
      </Box>

      {/*Thumbnails */}
      <Box ref={thumbnailRef} className="keen-slider thumbnail" my="4">
        <Dailys
          totalDays={5}
          selectedDateIdx={currentSlide}
          setSelectedDateIdx={() => {}}
          dailyPlaces={dummy}
          className="keen-slider__slide"
        />
      </Box>
    </Flex>
  );
};
