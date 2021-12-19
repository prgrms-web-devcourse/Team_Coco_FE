import { Divider, Text, Flex, Badge, Box } from "@chakra-ui/react";
import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

import { ActionsMenu } from "@/components/ActionsMenu";
import { User } from "@/components/User";
import { formatCreatedAt } from "@/utils/date";
import { storage } from "@/utils/storage";

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
  const userId = storage.getUserId();

  return (
    <>
      <Divider />
      <Flex justifyContent="space-between">
        <Flex>
          <User
            size="sm"
            nickname={nickname}
            badge={
              schedulePostWriter ? (
                <Badge ml="1" colorScheme="cyan">
                  작성자
                </Badge>
              ) : null
            }
          />
        </Flex>
        {Number(userId) === writerId ? (
          <ActionsMenu icon={<IoEllipsisHorizontalSharp />}>
            <Box>수정</Box>
            <Box>삭제</Box>
          </ActionsMenu>
        ) : null}
      </Flex>
      <Text pl={12} fontSize="md">
        {content}
      </Text>
      <Text pl={12} fontSize="sm" color="gray.500">
        {formatCreatedAt(createdAt)}
      </Text>
    </>
  );
};
