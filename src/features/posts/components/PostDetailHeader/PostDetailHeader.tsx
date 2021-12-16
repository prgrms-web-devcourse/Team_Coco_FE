import { Stack, Flex } from "@chakra-ui/react";
import {
  IoEllipsisHorizontalOutline,
  IoLocationSharp,
  IoCalendarSharp,
} from "react-icons/io5";

import { TextWithIcon } from "@/components/TextWithIcon";
import { User } from "@/components/User";

type PostDetailHeaderProps = {
  postId: string | undefined;
};

export const PostDetailHeader = ({ postId }: PostDetailHeaderProps) => {
  return (
    <Stack height="100px" spacing={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <User size="md" />
        <IoEllipsisHorizontalOutline color="#718096" />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <TextWithIcon icon={<IoLocationSharp />}>도시명</TextWithIcon>
        <TextWithIcon icon={<IoCalendarSharp />}>
          2021년 10월 21일 14:00
        </TextWithIcon>
      </Flex>
    </Stack>
  );
};
