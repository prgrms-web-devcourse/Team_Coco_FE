import { Center, Stack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";

import { useSchedulesData } from "../../hooks";
import { Schedule } from "../Schedule";

export const Schedules = () => {
  const { data: schedules, isLoading } = useSchedulesData();
  console.log(schedules);
  return (
    <Stack spacing={4}>
      {!schedules.length && !isLoading && (
        <Center h="70vh">
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
            themes={schedule.themes}
          />
        );
      })}
      {isLoading && (
        <Center py="8">
          <Spinner color="cyan.500" />
        </Center>
      )}
    </Stack>
  );
};
