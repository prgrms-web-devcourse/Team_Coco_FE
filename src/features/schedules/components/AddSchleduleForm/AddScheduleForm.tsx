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
  FormErrorMessage,
  RadioGroup,
  Radio,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, addDays } from "date-fns";
import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import * as yup from "yup";

import { useCreateScheduleData } from "../../hooks";
import type { Position } from "../../types";
import { Carousel } from "../Carousel";
import { Dailys } from "../Dailys";
import { FriendsList } from "../FriendsList";
import { RoundAddButton } from "../RoundAddButton";
import { RoundUserAddButton } from "../RoundUserAddButton";
import { SearchPlace } from "../SearchPlace";

import { CustomizedModal } from "@/components/CustomizedModal";
import { DatePicker } from "@/components/DatePicker";
import { getTotalDays } from "@/utils/date";

type Marker = {
  addressName: string;
  phone: string;
  placeName: string;
  roadAddressName: string;
  spotId: number;
  position: Position;
};

type DailyPlace = Marker & { dateIdx: number; order: number };

type FormValues = {
  title: string;
  themes: Theme;
  startDate: Date;
  endDate: Date;
  dailySchedulePlaces: DailyPlace[];
};

const defaultValues: FormValues = {
  title: "",
  themes: "FOOD",
  startDate: new Date(),
  endDate: new Date(),
  dailySchedulePlaces: [],
};

type Theme = "FOOD" | "ART" | "ACTIVITY" | "HISTORY" | "NATURE";
const themes: Theme[] = ["FOOD", "ART", "ACTIVITY", "HISTORY", "NATURE"];

const schema = yup.object().shape({
  title: yup
    .string()
    .required("여행 제목을 입력해주세요.")
    .max(16, "여행 제목은 16글자 이하여야 합니다.")
    .min(1, "여행 제목은 1글자 이상이어야 합니다."),
  themes: yup.string().required("테마를 선택해주세요."),
  startDate: yup.date().required(),
  endDate: yup
    .date()
    .required()
    .min(yup.ref("startDate"), "출발 날짜 이후여야 합니다.")
    .when(
      "startDate",
      (startDate, schema) =>
        startDate &&
        schema.max(
          addDays(startDate, 6),
          `완료날짜는 ${format(
            addDays(startDate, 6),
            "yyyy-MM-dd"
          )}이전이여야 합니다`
        )
    ),

  dailySchedulePlaces: yup
    .array()
    .of(
      yup.object().shape({
        addressName: yup.string(),
        phone: yup.string(),
        placeName: yup.string(),
        roadAddressName: yup.string(),
        spotId: yup.string(),
      })
    )
    .min(1, "최소 하나의 여행 장소를 추가해 주세요"),
});

export const AddScheduleForm = () => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  console.log(watch(), errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dailySchedulePlaces",
  });

  const [selectedPlace, setSelectedPlace] = useState<Marker>();
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tempStartDate = watch("startDate");
  const tempEndDate = watch("endDate");
  const totalDays = getTotalDays(tempEndDate, tempStartDate);
  const { mutate: createSchedule } = useCreateScheduleData();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formattedData = {
      ...data,
      themes: Array.isArray(data.themes) ? data.themes : [data.themes],
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      dailyScheduleSpotCreationRequests: data.dailySchedulePlaces.map(
        (dailySchedulePlace) => {
          return {
            ...dailySchedulePlace,
            date: dailySchedulePlace.dateIdx,
          };
        }
      ),
    };

    createSchedule({ data: formattedData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8}>
        <FormControl id="title" isInvalid={Boolean(errors.title)}>
          <FormLabel>여행 제목</FormLabel>
          <Input
            type="text"
            placeholder="여행 제목을 입력해 주세요"
            maxLength={16}
            {...register("title")}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <SimpleGrid columns={2} spacing={2}>
          <Stack>
            <FormControl id="startDate">
              <FormLabel>출발 날짜</FormLabel>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker onChange={onChange} selected={value} />
                )}
              />
            </FormControl>
          </Stack>

          <Stack>
            <FormControl id="endDate" isInvalid={Boolean(errors.endDate)}>
              <FormLabel>완료 날짜</FormLabel>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker onChange={onChange} selected={value} />
                )}
              />
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </SimpleGrid>

        <FormControl id="member">
          <FormLabel>멤버</FormLabel>
          <HStack>
            <AvatarGroup size="md" max={5}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
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

        <FormControl id="themes">
          <FormLabel>테마</FormLabel>
          <Controller
            name={"themes"}
            control={control}
            render={({ field }) => {
              return (
                <RadioGroup {...field}>
                  <Stack direction="row" spacing={2} justify="space-between">
                    {themes.map((item, idx) => {
                      return (
                        <VStack as="label" key={`radio-${idx}`}>
                          <Radio
                            id={`radio-${idx}`}
                            value={item}
                            size="md"
                            colorScheme="cyan"
                          />
                          <Text fontSize="sm">{item}</Text>
                        </VStack>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              );
            }}
          />
        </FormControl>

        <FormControl
          id="dailySchedulePlaces"
          isInvalid={Boolean(errors.dailySchedulePlaces)}
        >
          <VisuallyHidden>
            <FormLabel>여행 장소 일정</FormLabel>
          </VisuallyHidden>

          <SearchPlace setSelectedPlace={setSelectedPlace} />
          <HStack
            p="4"
            h="90"
            bg="gray.50"
            mb="8"
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
            <RoundAddButton
              onClick={() => {
                if (!selectedPlace) return;
                append({
                  ...selectedPlace,
                  dateIdx: selectedDateIdx,
                  order: fields.filter(
                    (dailyPlace: any) => dailyPlace.date === selectedDateIdx
                  ).length,
                });
              }}
            />
          </HStack>

          <Carousel perViewInfo={{ base: 2 }}>
            <Dailys
              totalDays={totalDays}
              selectedDateIdx={selectedDateIdx}
              setSelectedDateIdx={setSelectedDateIdx}
              dailyPlaces={fields}
              className="keen-slider__slide"
              onDelete={remove}
            />
          </Carousel>

          <FormErrorMessage>
            {errors.dailySchedulePlaces &&
              "최소 하나의 여행 장소를 추가해 주세요"}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          size="lg"
          width="100%"
          colorScheme="cyan"
          color="gray.50"
          variant="solid"
          mt={12}
          mb={4}
          onClick={handleSubmit(onSubmit)}
        >
          플랜 완성하기
        </Button>
      </Stack>
    </form>
  );
};
