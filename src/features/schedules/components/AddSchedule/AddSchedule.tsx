import { Flex, Box, Heading, useColorModeValue } from "@chakra-ui/react";

import { AddScheduleForm } from "../AddSchleduleForm";

export const AddSchedule = () => {
  return (
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
  );
};
