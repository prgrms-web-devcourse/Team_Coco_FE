import { Button } from "@chakra-ui/react";

import { useModifyLikedPostData } from "@/features/posts/hooks";

export type PostLikeButtonProps = {
  likeCount: number;
  isLiked: boolean;
  postId: number | null;
};

export const PostLikeButton = ({
  likeCount,
  isLiked,
  postId,
}: PostLikeButtonProps) => {
  const { isLoading, mutate: modifyLikedPost } = useModifyLikedPostData();
  return (
    <Button
      size="xs"
      colorScheme={isLiked ? "cyan" : undefined}
      onClick={() => {
        modifyLikedPost({
          postId,
          data: { flag: !isLiked, schedulePostId: postId },
        });
      }}
      isLoading={isLoading}
    >
      {likeCount}명이 좋아해요
    </Button>
  );
};
