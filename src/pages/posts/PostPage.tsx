import { Heading } from "@chakra-ui/react";

import { PrivatePageLayout } from "@/components/Layout";

export const PostPage = () => {
  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">플랜보기</Heading>}
    >
      포스트 보기
    </PrivatePageLayout>
  );
};
