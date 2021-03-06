import { Center, Text } from "@chakra-ui/react";
import React from "react";

import { Theme } from "../../types";

type ThemeTagProps = {
  theme: Theme;
};

type DynamicStyles = Record<Theme, { label: string; bgColor: string }>;

const dynamicStyles: DynamicStyles = {
  FOOD: {
    label: "λ§μ§ π½",
    bgColor: "#f3970c",
  },
  ART: {
    label: "μμ  π",
    bgColor: "#ad58df",
  },
  ACTIVITY: {
    label: "μ‘ν°λΉν° β·",
    bgColor: "#297eff",
  },
  HISTORY: {
    label: "μ­μ¬ π―",
    bgColor: "#aa6e20",
  },
  NATURE: {
    label: "μμ° π",
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
