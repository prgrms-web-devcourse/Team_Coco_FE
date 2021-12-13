import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { PrivatePageLayout } from "@/components/Layout";
import { PostUpdateForm } from "@/features/posts/components";

export const PostUpdatePage = () => {
  const { postId } = useParams();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">포스트 {postId ? "수정" : "생성"}</Heading>}
    >
      <PostUpdateForm postId={postId} />
    </PrivatePageLayout>
  );
};
