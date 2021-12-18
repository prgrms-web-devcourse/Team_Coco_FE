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
  Spinner,
  Center,
  Link as ChakraLink,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoEllipsisHorizontal, IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useDeleteScheduleData, useScheduleData } from "../../hooks";
import { ThemeTag } from "../ThemeTag";

import { ActionsMenu } from "@/components/ActionsMenu";
import { CustomizedModal } from "@/components/CustomizedModal";
import { DailyCarouselWithInfos } from "@/features/schedules/components/DailyCarouselWithInfos";
import { FriendsList } from "@/features/schedules/components/FriendsList";
import { RoundUserAddButton } from "@/features/schedules/components/RoundUserAddButton";
import { getTotalDays } from "@/utils/date";

type ScheduleDetailProps = {
  scheduleId: number;
};

export const ScheduleDetail = ({ scheduleId }: ScheduleDetailProps) => {
  const { data: schedule, isLoading } = useScheduleData({ scheduleId });
  const { mutateAsync: deleteSchedule } = useDeleteScheduleData();
  const {
    isOpen: isMemberModalOpen,
    onOpen: onMemberModalOpen,
    onClose: onMemberModalClose,
  } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const onDeleteSchedule = async () => {
    onAlertClose();
    await deleteSchedule({ scheduleId });
  };

  if (isLoading) {
    return (
      <Center h="80vh">
        <Spinner color="cyan.500" />
      </Center>
    );
  }

  if (Object.keys(schedule).length === 0) {
    return (
      <Center h="80vh">
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
          <Box>
            <ChakraLink as={Link} to={`/schedules/update/${schedule.id}`}>
              수정
            </ChakraLink>
          </Box>
          <Box color="red.600" onClick={onAlertOpen}>
            삭제
          </Box>
        </ActionsMenu>

        <AlertDialog
          isOpen={isAlertOpen}
          onClose={onAlertClose}
          leastDestructiveRef={undefined}
        >
          <AlertDialogOverlay>
            <AlertDialogContent mx={4}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                플랜 삭제하기
              </AlertDialogHeader>

              <AlertDialogBody>정말로 플랜을 삭제하시겠습니까?</AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onAlertClose}>취소</Button>
                <Button colorScheme="red" onClick={onDeleteSchedule} ml={3}>
                  플랜 삭제
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
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
        <RoundUserAddButton onClick={onMemberModalOpen} />
        <CustomizedModal
          head="멤버 초대하기"
          isOpen={isMemberModalOpen}
          onClose={onMemberModalClose}
        >
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
