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
import { Link } from "react-router-dom";

import { SimpleUser } from "@/components/SimpleUser";
import { TextWithIcon } from "@/components/TextWithIcon";

export const Post = () => {
  return (
    <LinkBox p={4} w="full" bg="gray.50">
      <HStack justify="space-between">
        <SimpleUser />
        <Box>테마</Box>
      </HStack>
      <Heading size="md" my={4}>
        <LinkOverlay as={Link} to="id">
          제목
        </LinkOverlay>
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
