import {
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { GoToBackButton } from "@/components/GoToBackButton";
import { GoToUpdateButton } from "@/components/GoToUpdateButton";
import { PrivatePageLayout } from "@/components/Layout";
import { MemoList, VoteList } from "@/features/note/components";

export const NotePage = () => {
  const { state: scheduleId } = useLocation();

  const tabs = ["memo", "vote"];
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <PrivatePageLayout
      title="메모 및 투표"
      header={
        <>
          <GoToBackButton />
          <Heading size="lg">메모 및 투표</Heading>
        </>
      }
    >
      <Box position="relative">
        <Tabs
          height="1"
          paddingTop={4}
          variant="soft-rounded"
          onChange={(idx) => setTabIndex(idx)}
        >
          <TabList marginBottom="1rem">
            <Tab
              _selected={{ color: "white", bg: "cyan.600", outline: "none" }}
            >
              메모
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "cyan.600", outline: "none" }}
            >
              투표
            </Tab>
          </TabList>

          <TabPanels height="630px" overflow="auto">
            <TabPanel paddingTop="0">
              <MemoList scheduleId={scheduleId} />
            </TabPanel>

            <TabPanel paddingTop="0">
              <VoteList scheduleId={scheduleId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <GoToUpdateButton target={tabs[tabIndex]} scheduleId={scheduleId} />
      </Box>
    </PrivatePageLayout>
  );
};
