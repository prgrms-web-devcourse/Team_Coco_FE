import { Center, Stack, Text } from "@chakra-ui/layout";

import { useSchedulesData } from "../../hooks";
import { Schedule } from "../Schedule";

import { CustomSpinner } from "@/components/CustomSpinner";

export const Schedules = () => {
  const { data: schedules, isLoading } = useSchedulesData();

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
          <CustomSpinner />
        </Center>
      )}
    </Stack>
  );
};
