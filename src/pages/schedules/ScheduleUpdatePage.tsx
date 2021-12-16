import { Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { AddSchedule } from "@/features/schedules/components/AddSchedule";

export const ScheduleUpdatePage = () => {
  const { scheduleId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">스케줄 {scheduleId ? "수정" : "생성"}</Heading>
        </>
      }
    >
      <AddSchedule />
    </PrivatePageLayout>
  );
};
