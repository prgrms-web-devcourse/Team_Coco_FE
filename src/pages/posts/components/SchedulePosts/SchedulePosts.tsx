import {
  Flex,
  VStack,
  Select,
  SelectProps,
  HStack,
  useColorModeValue as mode,
  LinkBox,
  Box,
  LinkOverlay,
  Heading,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";

import { SchedulePostsSearchForm } from "../SchedulePostsSearchForm";

import { TextWithIcon } from "@/components/TextWithIcon";

const sortByOptions = {
  defaultValue: "",
  options: [
    { label: "최신순", value: "new" },
    { label: "조회순", value: "views" },
    { label: "좋아요순", value: "likes" },
    { label: "댓글순", value: "comments" },
  ],
};

const SortBySelect = (props: SelectProps) => {
  return (
    <Select
      aria-label="Sort by"
      defaultValue={sortByOptions.defaultValue}
      focusBorderColor={mode("blue.500", "blue.200")}
      {...props}
    >
      {sortByOptions.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

const SchedulePost = () => {
  return (
    <LinkBox p="1rem" w="full" bg="gray.50">
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

export const SchedulePosts = () => {
  return (
    <>
      <SchedulePostsSearchForm />
      <Flex justify="flex-end" my={4}>
        <HStack flexShrink={0}>
          <SortBySelect variant="unstyled" />
        </HStack>
      </Flex>
      <VStack spacing="1rem">
        <SchedulePost />
        <SchedulePost />
        <SchedulePost />
        <SchedulePost />
        <SchedulePost />
      </VStack>
    </>
  );
};
