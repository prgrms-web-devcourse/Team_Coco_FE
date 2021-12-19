import { Center, Text } from "@chakra-ui/react";
import React from "react";

import { Theme } from "../../types";

type ThemeTagProps = {
  theme: Theme;
};

type DynamicStyles = Record<Theme, { label: string; bgColor: string }>;

const dynamicStyles: DynamicStyles = {
  FOOD: {
    label: "맛집 🍽",
    bgColor: "#f3970c",
  },
  ART: {
    label: "예술 🏛",
    bgColor: "#ad58df",
  },
  ACTIVITY: {
    label: "액티비티 ⛷",
    bgColor: "#297eff",
  },
  HISTORY: {
    label: "역사 🏯",
    bgColor: "#aa6e20",
  },
  NATURE: {
    label: "자연 🏕",
    bgColor: "#05aa3c",
  },
};

export const ThemeTag = ({ theme }: ThemeTagProps) => {
  return (
    <>
      <Center
        borderRadius="2xl"
        bg={dynamicStyles[theme].bgColor}
        color="white"
        w={"fit-content"}
        px={4}
        h={8}
      >
        <Text size="md">{dynamicStyles[theme].label}</Text>
      </Center>
    </>
  );
};
