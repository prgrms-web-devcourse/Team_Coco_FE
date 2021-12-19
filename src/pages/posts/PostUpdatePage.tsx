import { Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { PrivatePageLayout } from "@/components/Layout";
import { PostUpdateForm } from "@/features/posts/components";

export const PostUpdatePage = () => {
  const { postId } = useParams();

  return (
    <PrivatePageLayout
      title={`포스트 ${postId ? "수정" : "생성"}`}
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">포스트 {postId ? "수정" : "생성"}</Heading>
        </>
      }
    >
      <PostUpdateForm postId={postId} />
    </PrivatePageLayout>
  );
};
