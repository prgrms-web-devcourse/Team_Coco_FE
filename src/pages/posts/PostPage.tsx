import { Heading, Stack } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { CustomSpinner } from "@/components/CustomSpinner";
import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  PostDetailHeader,
  PostDetailContent,
  Comments,
  AddCommentForm,
} from "@/features/posts/components";
import { usePostData } from "@/features/posts/hooks";
import { useCommentsData } from "@/features/posts/hooks";
import { isEmpty } from "@/utils/assertion";

export const PostPage = () => {
  const { postId } = useParams();
  const { data: post, isLoading: postLoading } = usePostData({
    postId: postId ? Number(postId) : null,
    enabled: !!postId,
  });

  const { data: comments } = useCommentsData({
    postId: postId ? Number(postId) : null,
    enabled: !!postId,
  });

  return (
    <PrivatePageLayout
      title={isEmpty(post) ? "" : post.title}
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">플랜보기</Heading>
        </>
      }
    >
      {postLoading ? (
        <Center sx={{ height: "calc(100vh - 5rem)" }}>
          <CustomSpinner />
        </Center>
      ) : isEmpty(post) ? (
        <Navigate to="/posts" />
      ) : (
        <Stack py={4} spacing={4}>
          <PostDetailHeader
            writerId={post.writerId}
            postId={postId}
            nickname={post.nickname}
            city={post.city}
            createdAt={post.createdAt}
          />
          <PostDetailContent
            title={post.title}
            content={post.content}
            dailyPlaces={post.dailyScheduleSpots}
            views={post.views}
            isLiked={post.isLiked}
            likeCount={post.likeCount}
            postId={postId ? Number(postId) : null}
          />
          <Stack spacing={4}>
            <AddCommentForm postId={postId ? Number(postId) : null} />
            {isEmpty(comments) ? null : (
              <Comments
                postId={postId ? Number(postId) : null}
                comments={comments}
              />
            )}
          </Stack>
        </Stack>
      )}
    </PrivatePageLayout>
  );
};
