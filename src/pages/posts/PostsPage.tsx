import { Box, Flex, HStack, Heading } from "@chakra-ui/react";

import { GoToUpdateButton } from "@/components/GoToUpdateButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  Posts,
  PostsSearchForm,
  SortBySelect,
} from "@/features/posts/components";

export const PostsPage = () => {
  return (
    <PrivatePageLayout
      title="플랜찾기"
      header={<Heading size="lg">플랜찾기</Heading>}
    >
      <Box my={4}>
        <PostsSearchForm />
      </Box>
      <Flex justify="flex-end" my={4}>
        <HStack flexShrink={0}>
          <SortBySelect />
        </HStack>
      </Flex>
      <Box my={4}>
        <Posts />
      </Box>
      <GoToUpdateButton target="posts" />
    </PrivatePageLayout>
  );
};
