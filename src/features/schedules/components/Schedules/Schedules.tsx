import { Box, Center, Heading, Stack, Text } from "@chakra-ui/layout";

import { useSchedulesData } from "../../hooks";
import { Schedule } from "../Schedule";

export const Schedules = () => {
  const { data: schedules } = useSchedulesData();

  return (
    <Stack spacing={4}>
      {!schedules.length && (
        <Center borderRadius="xl" overflow="hidden" h="70vh">
          <Text fontSize="2xl" color="gray.400">
            새로운 플랜을 만들어 보세요
          </Text>
        </Center>
      )}
      {schedules.map((schedule, idx) => {
        return (
          <Schedule
            key={`Schedule-${schedule.id}-${idx}`}
            id={schedule.id}
            title={schedule.title}
            startedDate={schedule.startDate}
            endedDate={schedule.endDate}
          />
        );
      })}
    </Stack>
  );
};
