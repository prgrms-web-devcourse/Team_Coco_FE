import { Heading, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";
import { Schedules } from "@/features/schedules/components/Schedules";

const dummy = [
  {
    id: 1,
    title: "string",
    startDate: [2021, 12, 13],
    endDate: [2021, 12, 13],
    thema: ["FOOD"],
  },
  {
    id: 2,
    title: "string",
    startDate: [2021, 12, 13],
    endDate: [2021, 12, 13],
    thema: ["FOOD"],
  },
  {
    id: 3,
    title: "string",
    startDate: [2021, 12, 13],
    endDate: [2021, 12, 13],
    thema: ["FOOD"],
  },
];

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
