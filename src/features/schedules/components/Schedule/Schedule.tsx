import {
  Box,
  Heading,
  LinkBox,
  Stack,
  HStack,
  LinkOverlay,
} from "@chakra-ui/layout";
import { isBefore } from "date-fns";
import { useMemo } from "react";
import { IoCalendarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { Theme } from "../../types";
import { ThemeTag } from "../ThemeTag";

import { TextWithIcon } from "@/components/TextWithIcon";

type ScheduleProps = {
  title: string;
  startedDate: string;
  endedDate: string;
  id: number;
  themes: Theme[];
};

type DynamicStyles = Record<
  "before" | "during" | "end",
  { label: string; bgColor: string }
>;

const dynamicStyles: DynamicStyles = {
  before: {
    label: "예정",
    bgColor: "#eec05e",
  },
  during: {
    label: "여행 중",
    bgColor: "#1fc9e7",
  },
  end: {
    label: "완료",
    bgColor: "#a8bbc2",
  },
};

export const Schedule = (props: ScheduleProps) => {
  const { title, startedDate, endedDate, id, themes } = props;
  const scheduleStatus = useMemo(() => {
    const today = Date.now();
    const formattedStartedDate = new Date(startedDate);
    const formattedEndedDate = new Date(endedDate);
    const isBeforeStarted = isBefore(today, formattedStartedDate);
    const isBeforeEnded = isBefore(today, formattedEndedDate);

    return isBeforeStarted ? "before" : isBeforeEnded ? "during" : "end";
  }, []);

  return (
    <LinkBox w="full" display="flex" justifyContent="center">
      <Box maxW="sm" borderRadius="xl" overflow="hidden" flex="1" shadow="md">
        <Box bg={dynamicStyles[scheduleStatus]?.bgColor} h={"106px"} p={4}>
          <Stack spacing={4}>
            <Heading color="gray.50" fontSize="xl" fontFamily={"body"}>
              <LinkOverlay as={Link} to={id.toString()}>
                {title}
              </LinkOverlay>
            </Heading>
            <ThemeTag theme={themes[0]} />
          </Stack>
        </Box>
        <Box bg="gray.100" p={4}>
          <HStack justify="space-between">
            <Box>
              <TextWithIcon icon={<IoCalendarSharp />}>
                {startedDate} ~ {endedDate}
              </TextWithIcon>
            </Box>
            <Box>
              <Box>
                <Box
                  py="1"
                  width="16"
                  align="center"
                  fontSize="sm"
                  borderRadius="md"
                  color="gray.50"
                  bg={dynamicStyles[scheduleStatus]?.bgColor}
                >
                  {dynamicStyles[scheduleStatus]?.label}
                </Box>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Box>
    </LinkBox>
  );
};
