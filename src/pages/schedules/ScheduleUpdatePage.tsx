import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";

export const ScheduleUpdatePage = () => {
  const { scheduleId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={
        <Heading size="lg">스케줄 {scheduleId ? "수정" : "생성"}</Heading>
      }
    >
      스케줄 갱신
    </PrivatePageLayout>
  );
};
