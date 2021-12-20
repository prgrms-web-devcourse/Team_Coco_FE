import { LinkBox, LinkOverlay, Heading, HStack, Flex } from "@chakra-ui/react";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { TextWithIcon } from "@/components/TextWithIcon";
import { User } from "@/components/User";
import type { City } from "@/features/posts/types";
import { ThemeTag } from "@/features/schedules/components/ThemeTag";
import type { Theme } from "@/features/schedules/types";

export type PostProps = {
  city: City;
  startDate: string;
  endDate: string;
  nickname: string;
  postId: number;
  themes: Theme[];
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
        {themes.map((theme) => {
          return <ThemeTag key={theme} theme={theme} />;
        })}
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
