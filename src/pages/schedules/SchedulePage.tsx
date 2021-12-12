import {
  Heading,
  Text,
  Stack,
  HStack,
  Flex,
  Button,
  AvatarGroup,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { IoEllipsisHorizontal, IoAdd } from "react-icons/io5";

import { CustomizedModal } from "@/components/CustomizedModal";
import { PrivatePageLayout } from "@/components/Layout";
import { DailyCarouselWithInfos } from "@/features/schedules/components/DailyCarouselWithInfos";
import { FriendsList } from "@/features/schedules/components/FriendsList";
import { MapContainer } from "@/features/schedules/components/MapContainer";
import { RoundUserAddButton } from "@/features/schedules/components/RoundUserAddButton";

export const SchedulePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <PrivatePageLayout
      title="id"
      header={<Heading size="lg">스케줄 보기</Heading>}
    >
      <Stack my="4" spacing={4}>
        <Flex justify="space-between" align="center">
          <Heading fontSize="xl" color="gray.700">
            경주 졸업 여행
          </Heading>
          <Button variant="ghost">
            <IoEllipsisHorizontal color="gray.700" />
          </Button>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="lg">🍽 🏛 🏯</Text>
          <Text fontSize="md" color="gray.500">
            {"2021-11-02"} ~ {"2021-11-06"}
          </Text>
        </Flex>

        <Heading fontSize="md" color="gray.600">
          멤버
        </Heading>
        <HStack>
          <AvatarGroup size="md" max={5}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <IoAdd color="718096" />
          <RoundUserAddButton onClick={onOpen} />
          <CustomizedModal
            head="멤버 초대하기"
            isOpen={isOpen}
            onClose={onClose}
          >
            <FriendsList showRole={true} showInvitation={true} />
          </CustomizedModal>
        </HStack>

        <MapContainer setSelectedPlace={() => {}} />

        <DailyCarouselWithInfos />
      </Stack>
    </PrivatePageLayout>
  );
};
