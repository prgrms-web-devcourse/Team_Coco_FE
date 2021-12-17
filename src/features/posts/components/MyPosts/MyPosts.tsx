import { Posts } from "@/features/posts/components";
import { useMyPostsData } from "@/features/posts/hooks";
import { isEmpty } from "@/utils/assertion";

export const MyPosts = () => {
  const { data: posts } = useMyPostsData();
  if (isEmpty(posts)) {
    return <div>플랜이 없습니다.</div>;
  }
  return <Posts data={posts} />;
};
