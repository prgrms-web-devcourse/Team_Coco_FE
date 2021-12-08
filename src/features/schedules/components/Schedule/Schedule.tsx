import { Box, Heading, Text, LinkBox, Stack, HStack } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { isBefore } from "date-fns";
import { useMemo } from "react";

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
  const scheduleStatus = useMemo(() => {
    const today = Date.now();
    const formattedStartedDate = new Date(startedDate);
    const formattedEndedDate = new Date(endedDate);
    const isBeforeStarted = isBefore(today, formattedStartedDate);
    const isBeforeEnded = isBefore(today, formattedEndedDate);

    return isBeforeStarted ? "before" : isBeforeEnded ? "during" : "end";
  }, []);

  return (
    <LinkBox w="full">
      <Box maxW="sm" borderRadius="xl" overflow="hidden">
        <Box bg={dynamicStyles[scheduleStatus]?.bgColor} h={"106px"} p={4}>
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
                variant="solid"
                bg={dynamicStyles[scheduleStatus]?.bgColor}
              >
                {dynamicStyles[scheduleStatus]?.label}
              </Tag>
            </Box>
          </HStack>
        </Box>
      </Box>
    </LinkBox>
  );
};
