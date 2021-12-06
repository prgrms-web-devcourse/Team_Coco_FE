import { PostsPageHeader, ConnectionPosts, SchedulePosts } from "./components";
import { usePostsPage } from "./hooks/usePostsPage";

import { PageLayout } from "@/components/Layout";

const ContentComponents = [SchedulePosts, ConnectionPosts];

export const PostsPage = () => {
  const { contentIndex, handleChange } = usePostsPage();

  const ContentComponent = ContentComponents[contentIndex];

  return (
    <PageLayout
      title="게시글"
      header={<PostsPageHeader index={contentIndex} onChange={handleChange} />}
    >
      <ContentComponent />
    </PageLayout>
  );
};
