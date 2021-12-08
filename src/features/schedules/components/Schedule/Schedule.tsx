import { Box, Heading, Text, LinkBox, Stack, HStack } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { isBefore } from "date-fns";
import { useEffect, useState } from "react";

type ScheduleProps = {
  title: string;
  startedDate: string;
  endedDate: string;
};

type DynamicStyles = {
  [key: string]: {
    label: string;
    bgColor: string;
  };
};

const dynamicStyles: DynamicStyles = {
  before: {
    label: "예정",
    bgColor: "cyan.400",
  },
  during: {
    label: "여행 중",
    bgColor: "cyan.600",
  },
  end: {
    label: "완료",
    bgColor: "gray.500",
  },
};

export const Schedule = ({ title, startedDate, endedDate }: ScheduleProps) => {
  const [dateState, setDateState] = useState("");

  useEffect(() => {
    const today = Date.now();
    const formattedStartedDate = new Date(startedDate);
    const formattedEndedDate = new Date(endedDate);
    const isBeforeStarted = isBefore(today, formattedStartedDate);
    const isBeforeEnded = isBefore(today, formattedEndedDate);

    let state = isBeforeStarted ? "before" : isBeforeEnded ? "during" : "end";
    setDateState(state);
  }, [startedDate, endedDate]);

  return (
    <LinkBox w="full">
      <Box maxW="sm" borderRadius="xl" overflow="hidden">
        <Box bg={dynamicStyles[dateState]?.bgColor} h={"106px"} p={4}>
          <Stack spacing={4}>
            <Heading color="gray.50" fontSize="xl" fontFamily={"body"}>
              {title}
            </Heading>
            <Text fontSize="md">🍽 🏛 ⛷ 🏕 🏯</Text>
          </Stack>
        </Box>
        <Box bg="gray.100" p={4}>
          <HStack justify="space-between">
            <Box>
              <Text color="gray.500" fontSize="md">
                {startedDate} ~ {endedDate}
              </Text>
            </Box>
            <Box>
              <Tag
                size="md"
                key="md"
                variant="solid"
                bg={dynamicStyles[dateState]?.bgColor}
                mr="4"
              >
                {dynamicStyles[dateState]?.label}
              </Tag>
            </Box>
          </HStack>
        </Box>
      </Box>
    </LinkBox>
  );
};
