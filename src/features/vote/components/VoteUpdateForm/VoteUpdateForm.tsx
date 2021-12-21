import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VisuallyHidden,
  InputGroup,
  Input,
  InputRightElement,
  Checkbox,
  Flex,
  Spacer,
  Box,
  Stack,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseSharp, IoAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import * as yup from "yup";

import { TextWithIcon } from "@/components/TextWithIcon";
import { useCreateVote } from "@/features/vote/hooks";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(1, "제목은 최소 1자 이상이어야 합니다.")
    .max(16, "제목은 최대 16자 이하이어야 합니다.")
    .required("제목을 입력해주세요."),
});

type FormValues = {
  title: string;
  multipleFlag: boolean;
  contents: Array<object>;
};

export const VoteUpdateForm = () => {
  const { state: scheduleId } = useLocation();
  const navigate = useNavigate();

  const [inputList, setInputList] = useState([{ value: "" }, { value: "" }]);

  const defaultValues: FormValues = {
    title: "",
    multipleFlag: true,
    contents: [],
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: createVote } = useCreateVote();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const list = [...inputList];

    list[index].value = e.target.value;
    setInputList([...list]);
  };

  const handleInputRemove = (index: number) => {
    const list = [...inputList];

    list.splice(index, 1);
    setInputList([...list]);
  };

  const handleInputAdd = () => {
    setInputList([...inputList, { value: "" }]);
  };

  type submitValue = {
    title: string;
    multipleFlag: boolean;
    contents: string[];
  };

  const onSubmit: SubmitHandler<submitValue> = async (data) => {
    const values: string[] = [];

    inputList.map((input) => values.push(input.value));

    data.contents = values;

    await createVote({ data, scheduleId: Number(scheduleId) });
    navigate("/note", { state: scheduleId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack marginTop={4} spacing={4} height="550px">
        <FormControl id="title" isInvalid={Boolean(errors.title)}>
          <VisuallyHidden>
            <FormLabel>제목</FormLabel>
          </VisuallyHidden>
          <Input
            px={4}
            variant="flushed"
            placeholder="제목을 입력하세요"
            {...register("title")}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl id="contents">
          <VisuallyHidden>
            <FormLabel>중복투표</FormLabel>
          </VisuallyHidden>
          <Flex>
            <Spacer />
            <Checkbox color="#718096" {...register("multipleFlag")}>
              중복 투표 가능
            </Checkbox>
          </Flex>
        </FormControl>

        <Box flexGrow={1}>
          <Stack spcaing={2}>
            {inputList.map((input, index) => (
              <div key={index}>
                <InputGroup>
                  <Input
                    placeholder="항목을 입력하세요"
                    color="#71809"
                    name="option"
                    value={input.value}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputRightElement
                    children={<IoCloseSharp color="#757575" />}
                    onClick={() => handleInputRemove(index)}
                  />
                </InputGroup>
                {inputList.length - 1 === index && (
                  <TextWithIcon
                    w="full"
                    marginTop={4}
                    icon={<IoAddSharp />}
                    onClick={() => handleInputAdd()}
                  >
                    항목 추가
                  </TextWithIcon>
                )}
              </div>
            ))}
          </Stack>
        </Box>
        <Button
          type="submit"
          size="lg"
          color="white"
          bg="cyan.600"
          isLoading={isSubmitting}
        >
          투표 만들기
        </Button>
      </Stack>
    </form>
  );
};
