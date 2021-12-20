import {
  Heading,
  Text,
  HStack,
  Flex,
  AvatarGroup,
  Avatar,
  Box,
  Stack,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { IoEllipsisHorizontal, IoAdd } from "react-icons/io5";

import { useScheduleData } from "../../hooks";
import { ThemeTag } from "../ThemeTag";

import { ActionsMenu } from "@/components/ActionsMenu";
import { CustomizedModal } from "@/components/CustomizedModal";
import { CustomSpinner } from "@/components/CustomSpinner";
import { DailyCarouselWithInfos } from "@/features/schedules/components/DailyCarouselWithInfos";
import { FriendsList } from "@/features/schedules/components/FriendsList";
import { RoundUserAddButton } from "@/features/schedules/components/RoundUserAddButton";
import { isEmpty } from "@/utils/assertion";
import { getTotalDays } from "@/utils/date";
import { objectKeys } from "@/utils/object";

type ScheduleDetailProps = {
  scheduleId: number;
};

export const ScheduleDetail = ({ scheduleId }: ScheduleDetailProps) => {
  const { data: schedule, isLoading } = useScheduleData({ scheduleId });
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return (
      <Center sx={{ height: "calc(100vh - 5rem)" }}>
        <CustomSpinner />
      </Center>
    );
  }

  if (isEmpty(objectKeys(schedule))) {
    return (
      <Center sx={{ height: "calc(100vh - 5rem)" }}>
        <Text>schedule정보를 찾을 수 없습니다</Text>
      </Center>
    );
  }

  const totalDays = getTotalDays(
    new Date(schedule.scheduleSimpleResponse.endDate),
    new Date(schedule.scheduleSimpleResponse.startDate)
  );

  return (
    <Stack spacing={4}>
      <Flex justify="space-between" align="center">
        <Heading fontSize="2xl" color="gray.700">
          {schedule.scheduleSimpleResponse.title}
        </Heading>

        <ActionsMenu icon={<IoEllipsisHorizontal />}>
          <Box>수정</Box>
          <Box color="red.600">삭제</Box>
        </ActionsMenu>
      </Flex>

      <Flex justify="space-between" align="center">
        <ThemeTag theme={schedule.scheduleSimpleResponse.themes[0]} />

        <Text fontSize="md" color="gray.500">
          {schedule.scheduleSimpleResponse.startDate} ~{" "}
          {schedule.scheduleSimpleResponse.endDate}
        </Text>
      </Flex>

      <Heading fontSize="lg" color="gray.700">
        멤버
      </Heading>
      <HStack>
        <AvatarGroup size="md" max={5}>
          {schedule.memberSimpleResponses.map((member) => {
            return (
              <Avatar key={`Avatar-${member.id}`} name={member.nickname} />
            );
          })}
        </AvatarGroup>
        <IoAdd color="718096" />
        <RoundUserAddButton onClick={onOpen} />
        <CustomizedModal head="멤버 초대하기" isOpen={isOpen} onClose={onClose}>
          <FriendsList showRole={true} showInvitation={true} />
        </CustomizedModal>
      </HStack>
      <DailyCarouselWithInfos
        spotResponseList={schedule.spotResponseList}
        totalDays={totalDays}
        scheduleId={scheduleId}
      />
    </Stack>
  );
};
