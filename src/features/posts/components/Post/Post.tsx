import {
  LinkBox,
  Box,
  LinkOverlay,
  Heading,
  Avatar,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";

import { TextWithIcon } from "@/components/TextWithIcon";

export const Post = () => {
  return (
    <LinkBox p={4} w="full" bg="gray.50">
      <HStack justify="space-between">
        <HStack spacing={4}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
            size="md"
          />
          <Box>
            <Text fontWeight={600}>닉네임</Text>
            <Text color={"gray.500"}>연령대 / 성별</Text>
          </Box>
        </HStack>
        <Box>테마</Box>
      </HStack>
      <Heading size="md" my={4}>
        <LinkOverlay href="#">제목</LinkOverlay>
      </Heading>
      <Flex justify="space-between">
        <TextWithIcon icon={<IoLocationSharp />}>도시명</TextWithIcon>
        <TextWithIcon icon={<IoCalendarSharp />}>
          2021-12-05 ~ 2021-12-12
        </TextWithIcon>
      </Flex>
    </LinkBox>
  );
};
