import {
  Text,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  SimpleGrid,
  HStack,
  AvatarGroup,
  Avatar,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { differenceInDays } from "date-fns";
import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";

import { Carousel } from "../Carousel";
import { Dailys } from "../Dailys";
import { FriendsList } from "../FriendsList";
import { RoundAddButton } from "../RoundAddButton";
import { RoundUserAddButton } from "../RoundUserAddButton";
import { SearchPlace } from "../SearchPlace";

import { CustomizedModal } from "@/components/CustomizedModal";
import { DatePicker } from "@/components/DatePicker";

type FormValues = {
  title: string;
  startDate: string;
  endDate: string;
  themeList: [];
  dailySchedulePlaces: [];
};

type Marker = {
  spotId: string;
  addressName: string;
  roadAddressName: string;
  phone: string;
  position: { lat: number; lng: number };
  placeName: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DailyPlace = Marker & { date: number; order: number };

export const AddScheduleForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register } = useForm<FormValues>();
  const [dailyPlaces, setDailyPlaces] = useState<any>([]); // <DailyPlace[]>
  const [selectedPlace, setSelectedPlace] = useState<Marker>();
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);

  const tempStartDate = new Date("2021-12-09");
  const tempEndDate = new Date("2021-12-13");
  const totalDays = differenceInDays(tempEndDate, tempStartDate) + 1;

  const handleAddPlaceClick = () => {
    setDailyPlaces((prev: any) => [
      ...prev,
      { date: selectedDateIdx, order: 1, ...selectedPlace },
    ]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("submit!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={8}>
        <FormControl id="title" isRequired>
          <FormLabel>여행 제목</FormLabel>
          <Input
            type="text"
            placeholder="여행 제목을 입력해 주세요"
            {...register("title")}
          />
        </FormControl>

        <SimpleGrid columns={2} spacing={2}>
          <Stack>
            <FormControl id="start-date" isRequired>
              <FormLabel>출발 날짜</FormLabel>
              <DatePicker
                onChange={function (
                  date: Date | [Date | null, Date | null] | null,
                  event: SyntheticEvent<any, Event> | undefined
                ): void {}}
              />
            </FormControl>
          </Stack>
          <Stack>
            <FormControl id="end-date" isRequired>
              <FormLabel>완료 날짜</FormLabel>
              <DatePicker
                onChange={function (
                  date: Date | [Date | null, Date | null] | null,
                  event: SyntheticEvent<any, Event> | undefined
                ): void {}}
              />
            </FormControl>
          </Stack>
        </SimpleGrid>

        <FormControl id="member" isRequired>
          <FormLabel>멤버</FormLabel>
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
        </FormControl>

        <FormControl id="theme" isRequired>
          <FormLabel>테마</FormLabel>
          <CheckboxGroup>
            <HStack>
              <Checkbox value="naruto">Naruto</Checkbox>
              <Checkbox value="sasuke">Sasuke</Checkbox>
              <Checkbox value="kakashi">kakashi</Checkbox>
            </HStack>
          </CheckboxGroup>
        </FormControl>

        <FormControl id="search-place">
          <SearchPlace setSelectedPlace={setSelectedPlace} />
          <HStack
            p="4"
            h="90"
            bg="gray.50"
            align="center"
            justify="space-between"
            borderBottomRadius="md"
          >
            <Stack>
              <Heading size="sm">{selectedPlace?.placeName}</Heading>
              <Text size="sm" color="gray.500">
                {selectedPlace?.addressName}
              </Text>
            </Stack>
            <RoundAddButton onClick={handleAddPlaceClick} />
          </HStack>
        </FormControl>

        <Carousel perViewInfo={{ base: 3, sm: 4 }}>
          <Dailys
            totalDays={totalDays}
            selectedDateIdx={selectedDateIdx}
            setSelectedDateIdx={setSelectedDateIdx}
            dailyPlaces={dailyPlaces}
          />
        </Carousel>
      </Stack>

      <Button
        type="submit"
        size="lg"
        width="100%"
        colorScheme="cyan"
        color="gray.50"
        variant="solid"
        mt={12}
        mb={4}
        onClick={handleSubmit}
      >
        플랜 완성하기
      </Button>
    </form>
  );
};
