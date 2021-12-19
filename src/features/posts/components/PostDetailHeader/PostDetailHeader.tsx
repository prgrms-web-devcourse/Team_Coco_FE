import { Stack, Flex, Box } from "@chakra-ui/react";
import { IoLocationSharp, IoCalendarSharp } from "react-icons/io5";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { ActionsMenu } from "@/components/ActionsMenu";
import { TextWithIcon } from "@/components/TextWithIcon";
import { User } from "@/components/User";
import { cityMap } from "@/features/posts/constants";
import { useDeletePostData } from "@/features/posts/hooks";
import { formatCreatedAt } from "@/utils/date";
import { storage } from "@/utils/storage";

type PostDetailHeaderProps = {
  writerId: number;
  nickname: string;
  city: string;
  createdAt: string;
  postId: string | undefined;
};

export const PostDetailHeader = ({
  writerId,
  nickname,
  city,
  createdAt,
  postId,
}: PostDetailHeaderProps) => {
  const userId = storage.getUserId();
  const isWriter = userId === writerId;
  const navigate = useNavigate();
  const { mutate: deletePost } = useDeletePostData();
  return (
    <Stack spacing={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <User size="sm" nickname={nickname} />
        {isWriter ? (
          <ActionsMenu icon={<IoEllipsisHorizontal />}>
            <Box
              onClick={() => {
                navigate(`/posts/update/${postId}`);
              }}
            >
              수정
            </Box>
            <Box
              onClick={() => {
                deletePost({ postId: postId ? Number(postId) : null });
              }}
            >
              삭제
            </Box>
          </ActionsMenu>
        ) : null}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <TextWithIcon icon={<IoLocationSharp />}>
          {cityMap[city as keyof typeof cityMap]}
        </TextWithIcon>
        <TextWithIcon icon={<IoCalendarSharp />}>
          {formatCreatedAt(createdAt)}
        </TextWithIcon>
      </Flex>
    </Stack>
  );
};
