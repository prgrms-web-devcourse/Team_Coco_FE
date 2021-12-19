import { Center } from "@chakra-ui/react";

import { CustomSpinner } from "@/components/CustomSpinner";
import { Posts } from "@/features/posts/components";
import { useMyPostsData } from "@/features/posts/hooks";
import { isEmpty } from "@/utils/assertion";
export const MyPosts = () => {
  const { data: posts, isLoading } = useMyPostsData();

  return isLoading ? (
    <Center>
      <CustomSpinner />
    </Center>
  ) : isEmpty(posts) ? (
    <div>플랜이 없습니다.</div>
  ) : (
    <Posts data={posts} />
  );
};
