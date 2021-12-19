import { Center } from "@chakra-ui/react";

import { CustomSpinner } from "@/components/CustomSpinner";
import { Posts } from "@/features/posts/components";
import { useLikedPostsData } from "@/features/posts/hooks";
import { isEmpty } from "@/utils/assertion";
export const LikedPosts = () => {
  const { data: posts, isLoading } = useLikedPostsData();

  return isLoading ? (
    <Center>
      <CustomSpinner />
    </Center>
  ) : isEmpty(posts) ? (
    <div>플랜이 없습니다</div>
  ) : (
    <Posts data={posts} />
  );
};
