import { Box, Flex, HStack, Heading, Center } from "@chakra-ui/react";
import { useState } from "react";

import { CustomSpinner } from "@/components/CustomSpinner";
import { GoToUpdateButton } from "@/components/GoToUpdateButton";
import { PrivatePageLayout } from "@/components/Layout";
import {
  Posts,
  PostsSearchForm,
  SortBySelect,
} from "@/features/posts/components";
import { usePostsData } from "@/features/posts/hooks";
import type { GetPostsDTO } from "@/features/posts/hooks";
import { isEmpty } from "@/utils/assertion";

export const PostsPage = () => {
  const [searchState, setSearchState] = useState<GetPostsDTO>({
    sorting: "최신순",
    searchingTheme: "ALL",
    searchingCity: "전체",
    search: "",
  } as GetPostsDTO);

  const { data: posts, isLoading } = usePostsData(searchState);

  return (
    <PrivatePageLayout
      title="플랜찾기"
      header={<Heading size="lg">플랜찾기</Heading>}
    >
      <Box my={4}>
        <PostsSearchForm setSearchState={setSearchState} />
      </Box>
      <Flex justify="flex-end" my={4}>
        <HStack flexShrink={0}>
          <SortBySelect setSearchState={setSearchState} />
        </HStack>
      </Flex>
      <Box my={4}>
        {isLoading ? (
          <Center>
            <CustomSpinner />
          </Center>
        ) : isEmpty(posts) ? (
          <div>포스트가 없습니다.</div>
        ) : (
          <Posts data={posts} />
        )}
      </Box>
      <GoToUpdateButton target="posts" />
    </PrivatePageLayout>
  );
};
