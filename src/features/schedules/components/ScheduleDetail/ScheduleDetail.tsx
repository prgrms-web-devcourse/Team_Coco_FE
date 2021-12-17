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
} from "@chakra-ui/react";
import { IoEllipsisHorizontal, IoAdd } from "react-icons/io5";

import { useScheduleData } from "../../hooks";

import { ActionsMenu } from "@/components/ActionsMenu";
import { CustomizedModal } from "@/components/CustomizedModal";
import { DailyCarouselWithInfos } from "@/features/schedules/components/DailyCarouselWithInfos";
import { FriendsList } from "@/features/schedules/components/FriendsList";
import { RoundUserAddButton } from "@/features/schedules/components/RoundUserAddButton";
import { getTotalDays } from "@/utils/date";

type ScheduleDetailProps = {
  scheduleId?: string;
};

export const ScheduleDetail = ({ scheduleId }: ScheduleDetailProps) => {
  const number = parseInt(scheduleId || "0", 10);
  const { data: schedule } = useScheduleData({ scheduleId: number });
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(schedule);

  if (Object.keys(schedule).length === 0) return <div></div>;
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
        <Text fontSize="lg">🍽 🏛 🏯</Text>
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
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
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
      />
    </Stack>
  );
};
