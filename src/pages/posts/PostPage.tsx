import { Heading, Stack, Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  PostDetailHeader,
  PostDetailContent,
  Comment,
} from "@/features/posts/components";
export const PostPage = () => {
  const { postId } = useParams();
  return (
    <PrivatePageLayout
      title="id"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">플랜보기</Heading>
        </>
      }
    >
      <Stack py={4} spacing={4}>
        <PostDetailHeader postId={postId} />
        <PostDetailContent postId={postId} />
        <Comment />
      </Stack>
    </PrivatePageLayout>
  );
};
