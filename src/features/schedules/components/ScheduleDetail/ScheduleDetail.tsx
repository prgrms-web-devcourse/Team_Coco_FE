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

type ScheduleDetailProps = {
  scheduleId?: string;
};

export const ScheduleDetail = ({ scheduleId }: ScheduleDetailProps) => {
  const number = parseInt(scheduleId || "0", 10);
  const { data: schedule } = useScheduleData({ scheduleId: number });
  console.log(schedule);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dummySchedule = {
    id: 0,
    memberSimpleResponses: [
      {
        id: 0,
        imageUrl: "string",
        nickname: "string",
      },
    ],
    scheduleSimpleResponse: {
      endDate: "2021-12-16",
      id: 0,
      startDate: "2021-12-20",
      themes: ["ACTIVITY"],
      title: "string",
    },
    spotResponseList: [
      {
        date: 4,
        order: 0,
        position: { lat: 35.8293538261623, lng: 129.218109530763 },
        id: 1839209698,
        spotId: 1839209698,
        placeName: "월정교",
        phone: "",
        addressName: "경북 경주시 교동 274",
        roadAddressName: "",
      },
      {
        date: 1,
        order: 0,
        position: { lat: 35.7382615855879, lng: 129.486876732783 },
        id: 11276178,
        spotId: 11276178,
        placeName: "경주문무대왕릉",
        phone: "",
        addressName: "경북 경주시 문무대왕면 봉길리 30-1",
        roadAddressName: "",
      },
      {
        date: 1,
        order: 0,
        position: { lat: 35.8213166189963, lng: 129.509520717781 },
        id: 11256465,
        spotId: 11256465,
        placeName: "오류고아라해변",
        phone: "",
        addressName: "경북 경주시 감포읍 오류리",
        roadAddressName: "",
      },
      {
        date: 1,
        order: 0,
        position: { lat: 35.849507092525485, lng: 129.26166060389696 },
        id: 19464673,
        spotId: 19464673,
        placeName: "경주동궁원",
        phone: "054-779-8725",
        addressName: "경북 경주시 북군동 185-1",
        roadAddressName: "경북 경주시 보문로 74-14",
      },
      {
        date: 1,
        order: 0,
        position: { lat: 35.8393348165945, lng: 129.209645417434 },
        id: 627627078,
        spotId: 627627078,
        placeName: "황리단길",
        phone: "",
        addressName: "경북 경주시 황남동 270-10",
        roadAddressName: "경북 경주시 태종로 746",
      },
      {
        date: 2,
        order: 0,
        position: { lat: 35.8293538261623, lng: 129.218109530763 },
        id: 1839209698,
        spotId: 1839209698,
        placeName: "월정교",
        phone: "",
        addressName: "경북 경주시 교동 274",
        roadAddressName: "",
      },
      {
        date: 2,
        order: 0,
        position: { lat: 35.83814999833691, lng: 129.21233472051617 },
        id: 8288444,
        spotId: 8288444,
        placeName: "경주대릉원",
        phone: "054-750-8650",
        addressName: "경북 경주시 황남동 268-10",
        roadAddressName: "경북 경주시 계림로 9",
      },
      {
        date: 3,
        order: 0,
        position: { lat: 35.8347762643542, lng: 129.226975518857 },
        id: 8179010,
        spotId: 8179010,
        placeName: "동궁과월지",
        phone: "054-750-8655",
        addressName: "경북 경주시 인왕동 517",
        roadAddressName: "",
      },
      {
        date: 3,
        order: 0,
        position: { lat: 35.77204424085, lng: 129.084330974478 },
        id: 130383717,
        spotId: 130383717,
        placeName: "화랑의언덕",
        phone: "054-751-8118",
        addressName: "경북 경주시 산내면 내일리 산 260-6",
        roadAddressName: "경북 경주시 산내면 수의길 601",
      },
      {
        date: 4,
        order: 0,
        position: { lat: 35.6860838852533, lng: 129.474229010739 },
        id: 27591086,
        spotId: 27591086,
        placeName: "주상절리조망타워",
        phone: "",
        addressName: "경북 경주시 양남면 읍천리 405-7",
        roadAddressName: "경북 경주시 양남면 동해안로 498-13",
      },
      {
        date: 5,
        order: 0,
        position: { lat: 35.7382615855879, lng: 129.486876732783 },
        id: 11276178,
        spotId: 11276178,
        placeName: "경주문무대왕릉",
        phone: "",
        addressName: "경북 경주시 문무대왕면 봉길리 30-1",
        roadAddressName: "",
      },
      {
        date: 5,
        order: 0,
        position: { lat: 35.7382615855879, lng: 129.486876732783 },
        id: 11276178,
        spotId: 11276178,
        placeName: "경주문무대왕릉",
        phone: "",
        addressName: "경북 경주시 문무대왕면 봉길리 30-1",
        roadAddressName: "",
      },
    ],
  };
  const formattedSchedule = {
    ...dummySchedule,
    spotResponseList: dummySchedule.spotResponseList.map(
      ({ date: dateIdx, ...rest }) => ({ dateIdx, ...rest })
    ),
  };

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
      />
    </Stack>
  );
};
