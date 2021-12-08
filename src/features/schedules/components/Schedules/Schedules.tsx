import { VStack } from "@chakra-ui/layout";

import { Schedule } from "../Schedule";

export const Schedules = () => {
  return (
    <VStack spacing={4}>
      <Schedule
        title={"1"}
        startedDate={"2022-02-29"}
        endedDate={"2022-02-30"}
      />
      <Schedule
        title={"2"}
        startedDate={"2022-02-29"}
        endedDate={"2022-02-30"}
      />
      <Schedule
        title={"3"}
        startedDate={"2021-12-05"}
        endedDate={"2021-12-20"}
      />
      <Schedule
        title={"4"}
        startedDate={"2021-12-05"}
        endedDate={"2021-12-20"}
      />
      <Schedule
        title={"5"}
        startedDate={"2020-12-29"}
        endedDate={"2020-12-30"}
      />
      <Schedule
        title={"6"}
        startedDate={"2020-12-29"}
        endedDate={"2020-12-30"}
      />
    </VStack>
  );
};
