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
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { IoEllipsisHorizontal, IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

import {
  useAddMember,
  useDeleteScheduleData,
  useScheduleData,
} from "../../hooks";
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
  const { mutate: addMember, isLoading: addMemberLoading } = useAddMember();
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
          <ChakraLink as={Link} to={`/schedules/update/${schedule.id}`}>
            수정
          </ChakraLink>
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
              <Avatar
                alt={"Member"}
                key={`Avatar-${member.id}`}
                name={member.nickname}
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
          <FriendsList
            members={schedule.memberSimpleResponses}
            isButtonLoading={addMemberLoading}
            handleClick={(member) =>
              addMember({
                scheduleId,
                data: { friendId: member.id },
              })
            }
          />
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
