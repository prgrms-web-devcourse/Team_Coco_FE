import { Posts } from "@/features/posts/components";
import { useLikedPostsData } from "@/features/posts/hooks";
import { isEmpty } from "@/utils/assertion";

export const LikedPosts = () => {
  const { data: posts } = useLikedPostsData();
  if (isEmpty(posts)) {
    return <div>플랜이 없습니다.</div>;
  }
  return <Posts data={posts} />;
};
