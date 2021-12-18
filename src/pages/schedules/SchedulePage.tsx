import {
  Heading,
  Text,
  Stack,
  HStack,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { IoChevronForward } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { ScheduleDetail } from "@/features/schedules/components/ScheduleDetail";

export const SchedulePage = () => {
  const { scheduleId } = useParams();

  if (scheduleId) {
    const scheduleIdNumber = parseInt(scheduleId, 10);

    return (
      <PrivatePageLayout
        title="id"
        header={
          <>
            <GoToBackButton />
            <Heading size="lg">스케줄 보기</Heading>
          </>
        }
      >
        <Stack my="4">
          <ScheduleDetail scheduleId={scheduleIdNumber} />

          <Flex justifyContent="flex-end">
            <ChakraLink as={Link} to={"/note"} state={scheduleIdNumber}>
              <HStack>
                <Text fontSize="lg" color="gray.700">
                  메모 및 투표
                </Text>
                <IoChevronForward size="22" color="#2D3748" />
              </HStack>
            </ChakraLink>
          </Flex>
        </Stack>
      </PrivatePageLayout>
    );
  } else {
    return <div>스케줄 id가 없습니다.</div>;
  }
};
