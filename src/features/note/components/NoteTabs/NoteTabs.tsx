import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import { ThumbnailGrid } from "../ThumbnailGrid";

type NoteTabsProps = {
  onChange?: (index: number) => void;
};

export const NoteTabs = ({ onChange = () => {} }: NoteTabsProps) => {
  return (
    <Tabs height="1" paddingTop={4} variant="soft-rounded">
      <TabList marginBottom="1rem">
        <Tab _selected={{ color: "white", bg: "cyan.600", outline: "none" }}>
          메모
        </Tab>
        <Tab _selected={{ color: "white", bg: "cyan.600", outline: "none" }}>
          투표
        </Tab>
      </TabList>
      <TabPanels height="630px" overflow="auto">
        <TabPanel paddingTop="0">
          <ThumbnailGrid tab="memo" />
        </TabPanel>
        <TabPanel paddingTop="0">
          <ThumbnailGrid tab="vote" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
