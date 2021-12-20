import { Center, Stack, Text } from "@chakra-ui/layout";

import { useSchedulesData } from "../../hooks";
import { Schedule } from "../Schedule";

import { CustomSpinner } from "@/components/CustomSpinner";
import { isEmpty } from "@/utils/assertion";

export const Schedules = () => {
  const { data: schedules, isLoading } = useSchedulesData();

  return isLoading ? (
    <Center sx={{ height: "calc(100vh - 5rem)" }}>
      <CustomSpinner />
    </Center>
  ) : isEmpty(schedules) ? (
    <Center>
      <Text fontSize="2xl" color="gray.400">
        새로운 플랜을 만들어 보세요
      </Text>
    </Center>
  ) : (
    <Stack spacing={4}>
      {schedules.map((schedule, idx) => (
        <Schedule
          key={`Schedule-${idx}`}
          id={schedule.id}
          title={schedule.title}
          startedDate={schedule.startDate}
          endedDate={schedule.endDate}
          themes={schedule.themes}
        />
      ))}
    </Stack>
  );
};
