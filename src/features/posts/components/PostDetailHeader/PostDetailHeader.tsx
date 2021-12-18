import { Stack, Flex } from "@chakra-ui/react";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";

import { TextWithIcon } from "@/components/TextWithIcon";
import { User } from "@/components/User";
import { formatCreatedAt } from "@/utils/date";

type PostDetailHeaderProps = {
  writerId: number;
  nickname: string;
  city: string;
  createdAt: string;
};

export const PostDetailHeader = ({
  writerId,
  nickname,
  city,
  createdAt,
}: PostDetailHeaderProps) => {
  return (
    <Stack spacing={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <User size="sm" nickname={nickname} />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <TextWithIcon icon={<IoLocationSharp />}>{city}</TextWithIcon>
        <TextWithIcon icon={<IoCalendarSharp />}>
          {formatCreatedAt(createdAt)}
        </TextWithIcon>
      </Flex>
    </Stack>
  );
};
