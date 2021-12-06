import { Tabs, TabList, Tab } from "@chakra-ui/react";

type PostsPageHeaderProps = {
  index: number;
  onChange: (index: number) => void;
};

export const PostsPageHeader = ({ index, onChange }: PostsPageHeaderProps) => {
  return (
    <Tabs isFitted size="lg" index={index} onChange={onChange}>
      <TabList>
        <Tab>인기플랜</Tab>
        <Tab>함께트립</Tab>
      </TabList>
    </Tabs>
  );
};
