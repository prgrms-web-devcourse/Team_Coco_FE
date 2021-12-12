import { Heading, Box, Stack } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { PostContent, Comment } from "@/features/posts/components";

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
      <Stack spacing={4}>
        <Box height="100px" bgColor="gray.100">
          작성자 상세정보 공통컴포넌트
        </Box>
        <PostContent postId={postId} />
        <Comment />
      </Stack>
    </PrivatePageLayout>
  );
};
