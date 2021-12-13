import { Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
      <Button as={Link} to="id">
        스케줄 보기
      </Button>
    </PrivatePageLayout>
  );
};
