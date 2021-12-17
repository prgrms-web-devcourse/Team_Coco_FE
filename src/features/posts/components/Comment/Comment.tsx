import { Divider, Text } from "@chakra-ui/react";
import React from "react";

import { User } from "@/components/User";
import { formatCreatedAt } from "@/utils/date";

export type CommentProps = {
  commentId: number;
  content: string;
  createdAt: string;
  nickname: string;
  schedulePostWriter: boolean;
  writerId: number;
};

export const Comment = ({
  commentId,
  content,
  createdAt,
  nickname,
  schedulePostWriter,
  writerId,
}: CommentProps) => {
  return (
    <>
      <Divider />
      <User size="sm" nickname={nickname} />
      <Text pl={12} fontSize="md">
        {content}
      </Text>
      <Text pl={12} fontSize="sm" color="gray.500">
        {formatCreatedAt(createdAt)}
      </Text>
    </>
  );
};
