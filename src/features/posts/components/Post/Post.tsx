import {
  LinkBox,
  Box,
  LinkOverlay,
  Heading,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { TextWithIcon } from "@/components/TextWithIcon";
import { User } from "@/components/User";

export type PostProps = {
  city: string;
  startDate: string;
  endDate: string;
  nickname: string;
  postId: number;
  themes: string[];
  title: string;
};

export const Post = ({
  city,
  nickname,
  startDate,
  endDate,
  themes,
  title,
  postId,
}: PostProps) => {
  return (
    <LinkBox p={4} w="full" bg="gray.50">
      <HStack justify="space-between">
        <User size="sm" nickname={nickname} />
        <Box>{themes.toString()}</Box>
      </HStack>
      <Heading size="md" my={4}>
        <LinkOverlay as={Link} to={`/posts/${postId}`}>
          {title}
        </LinkOverlay>
      </Heading>
      <Flex justify="space-between">
        <TextWithIcon icon={<IoLocationSharp />}>{city}</TextWithIcon>
        <TextWithIcon icon={<IoCalendarSharp />}>
          {`${startDate} ~ ${endDate}`}
        </TextWithIcon>
      </Flex>
    </LinkBox>
  );
};
