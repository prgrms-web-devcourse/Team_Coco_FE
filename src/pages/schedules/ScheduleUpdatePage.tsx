import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { AddScheduleForm } from "@/features/schedules/components/AddSchleduleForm";

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
      <Flex minH={"100vh"} align={"center"} justify={"center"} py={4}>
        <Box
          bg={useColorModeValue("white", "gray.700")}
          maxW={"90vw"}
          boxShadow={"xl"}
          borderTopRadius={"xl"}
          borderBottomRadius={"xl"}
        >
          <Box bg="cyan.400" p={4} borderTopRadius={"xl"}>
            <Heading color="gray.50" fontSize="xl" fontFamily={"body"}>
              나의 새 트립플랜
            </Heading>
          </Box>
          <Box px={4} py={6}>
            <AddScheduleForm />
          </Box>
        </Box>
      </Flex>
    </PrivatePageLayout>
  );
};
