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
import { getTotalDays } from "@/utils/date";

type ScheduleDetailProps = {
  scheduleId: number;
};

export const ScheduleDetail = ({ scheduleId }: ScheduleDetailProps) => {
  const { data: schedule, isLoading } = useScheduleData({ scheduleId });
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return (
      <Center sx={{ height: "calc(100vh-5rem)" }}>
        <CustomSpinner />
      </Center>
    );
  }

  if (Object.keys(schedule).length === 0) {
    return (
      <Center sx={{ height: "calc(100vh-5rem)" }}>
        <Text>schedule정보를 찾을 수 없습니다</Text>
      </Center>
    );
  }

  const formattedSchedule = {
    ...schedule,
    spotResponseList: schedule.spotResponseList?.map(
      ({ date: dateOrder, order: spotOrder, ...rest }) => ({
        dateOrder,
        spotOrder,
        ...rest,
      })
    ),
  };
  const totalDays = getTotalDays(
    new Date(schedule.scheduleSimpleResponse.endDate),
    new Date(schedule.scheduleSimpleResponse.startDate)
  );

  return (
    <Stack spacing={4}>
      <Flex justify="space-between" align="center">
        <Heading fontSize="2xl" color="gray.700">
          {formattedSchedule.scheduleSimpleResponse.title}
        </Heading>

        <ActionsMenu icon={<IoEllipsisHorizontal />}>
          <Box>수정</Box>
          <Box color="red.600">삭제</Box>
        </ActionsMenu>
      </Flex>

      <Flex justify="space-between" align="center">
        <ThemeTag theme={formattedSchedule.scheduleSimpleResponse.themes[0]} />

        <Text fontSize="md" color="gray.500">
          {formattedSchedule.scheduleSimpleResponse.startDate} ~{" "}
          {formattedSchedule.scheduleSimpleResponse.endDate}
        </Text>
      </Flex>

      <Heading fontSize="lg" color="gray.700">
        멤버
      </Heading>
      <HStack>
        <AvatarGroup size="md" max={5}>
          {formattedSchedule.memberSimpleResponses.map((member) => {
            return (
              <Avatar
                key={`Avatar-${member.id}`}
                name={member.nickname}
                src={member.imageUrl}
              />
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
        spotResponseList={formattedSchedule.spotResponseList}
        totalDays={totalDays}
        scheduleId={scheduleId}
      />
    </Stack>
  );
};
