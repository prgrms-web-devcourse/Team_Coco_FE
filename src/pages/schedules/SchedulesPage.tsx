import { Heading, Box } from "@chakra-ui/react";

import { GoToUpdateButton } from "@/components/GoToUpdateButton";
import { PrivatePageLayout } from "@/components/Layout";
import { Schedules } from "@/features/schedules/components/Schedules";

export const SchedulesPage = () => {
  return (
    <PrivatePageLayout
      title="나의 트립플랜"
      header={<Heading size="lg">나의 트립플랜</Heading>}
    >
      <Box my={4}>
        <Schedules />
      </Box>
      <GoToUpdateButton target="schedules" />
    </PrivatePageLayout>
  );
};
