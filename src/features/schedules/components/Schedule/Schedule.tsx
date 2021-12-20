import {
  Box,
  Heading,
  LinkBox,
  Stack,
  HStack,
  LinkOverlay,
  Flex,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { isBefore, sub } from "date-fns";
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
  id?: number;
  themes: Theme[];
  isLoading?: boolean;
};

type DynamicStyles = Record<
  "before" | "during" | "end",
  { label: string; bgColor: string }
>;

const dynamicStyles: DynamicStyles = {
  before: {
    label: "예정",
    bgColor: "#f7b63e",
  },
  during: {
    label: "여행 중",
    bgColor: "#0ebbda",
  },
  end: {
    label: "완료",
    bgColor: "#9dbfcc",
  },
};

export const Schedule = (props: ScheduleProps) => {
  const { title, startedDate, endedDate, id, themes } = props;
  const scheduleStatus = useMemo(() => {
    const today = Date.now();
    const formattedStartedDate = new Date(startedDate);
    const formattedEndedDate = new Date(endedDate);
    const isBeforeStarted = isBefore(
      today,
      sub(formattedStartedDate, { days: 1 })
    );
    const isBeforeEnded = isBefore(today, formattedEndedDate);

    return isBeforeStarted ? "before" : isBeforeEnded ? "during" : "end";
  }, [startedDate, endedDate]);

  return (
    <LinkBox w="full" display="flex" justifyContent="center">
      <Box
        maxW="sm"
        borderRadius="xl"
        overflow="hidden"
        flex="1"
        shadow="md"
        opacity={id ? "100%" : "60%"}
      >
        <Box bg={dynamicStyles[scheduleStatus]?.bgColor} h={"106px"} p={4}>
          <Stack spacing={4}>
            <Flex justify="space-between">
              <Heading color="gray.50" fontSize="xl" fontFamily={"body"}>
                <LinkOverlay
                  as={Link}
                  to={id ? id.toString() : ""}
                  replace={true}
                >
                  {title}
                </LinkOverlay>
              </Heading>
              {!id && <Spinner color="gray.50" size="md" mr="2" />}
            </Flex>
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
