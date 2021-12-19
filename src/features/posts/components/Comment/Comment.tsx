import { Divider, Text, Flex, Badge, Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

import { useDeleteCommentData } from "../../hooks";

import { User } from "@/components/User";
import { formatCreatedAt } from "@/utils/date";
import { storage } from "@/utils/storage";

export type CommentProps = {
  postId: number | null;
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
  postId,
}: CommentProps) => {
  const userId = storage.getUserId();
  const { mutate: deleteComment } = useDeleteCommentData();

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
          <IconButton
            aria-label="댓글 삭제"
            icon={<IoCloseOutline />}
            variant="unstyle"
            onClick={() => {
              deleteComment({ commentId, postId });
            }}
          />
        ) : null}
      </Flex>

      <Box pl={12}>
        <Text fontSize="md">{content}</Text>
      </Box>

      <Text pl={12} fontSize="sm" color="gray.500">
        {formatCreatedAt(createdAt)}
      </Text>
    </>
  );
};
