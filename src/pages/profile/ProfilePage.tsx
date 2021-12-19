import {
  Heading,
  Stack,
  Box,
  Text,
  Flex,
  Button,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { IoArrowForward, IoEllipsisHorizontal } from "react-icons/io5";

import { ActionsMenu } from "@/components/ActionsMenu";
import { CustomizedModal } from "@/components/CustomizedModal";
import { PrivatePageLayout } from "@/components/Layout";
import { User } from "@/components/User";
import { LikedPosts, MyPosts } from "@/features/posts/components";
import { useMyProfileData } from "@/features/user/hooks";

export const ProfilePage = () => {
  const friendsDisclosure = useDisclosure();
  const { data: profile } = useMyProfileData();
  const { nickname } = profile;

  return (
    <PrivatePageLayout
      title="마이 페이지"
      header={<Heading size="lg">마이 페이지</Heading>}
    >
      <Stack pt={4} spacing={4}>
        <Flex justify="space-between" align="center">
          <User size="md" nickname={nickname} />
          <ActionsMenu icon={<IoEllipsisHorizontal />}>
            <Box>로그아웃</Box>
            <Box>회원 정보 수정</Box>
            <Box>회원 탈퇴</Box>
          </ActionsMenu>
        </Flex>
        <Flex justify="space-between" align="center">
          <Text fontWeight={600}>친구 목록</Text>
          <Button
            rightIcon={<IoArrowForward />}
            variant="ghost"
            onClick={friendsDisclosure.onOpen}
          >
            더 보기
          </Button>
          <CustomizedModal
            head="나의 친구"
            isOpen={friendsDisclosure.isOpen}
            onClose={friendsDisclosure.onClose}
          ></CustomizedModal>
        </Flex>
        <Tabs isFitted>
          <TabList>
            <Tab>좋아요한 플랜</Tab>
            <Tab>나의 플랜</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LikedPosts />
            </TabPanel>
            <TabPanel>
              <MyPosts />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </PrivatePageLayout>
  );
};
