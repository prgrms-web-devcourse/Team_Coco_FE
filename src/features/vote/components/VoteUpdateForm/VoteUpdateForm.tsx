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
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { IoCloseSharp, IoAddSharp } from "react-icons/io5";
import * as yup from "yup";

import { TextWithIcon } from "@/components/TextWithIcon";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(1, "제목은 최소 1자 이상이어야 합니다.")
    .max(16, "제목은 최대 16자 이하이어야 합니다.")
    .required("제목을 입력해주세요"),
  contents: yup
    .array()
    .min(2, "항목은 최소 2개 이상이어야 합니다.")
    .of(yup.string().required()),
});

type FormValues = {
  title: string;
  multipleFlag: boolean;
  contents: Array<object>;
};

type VoteUpdateFormProps = {
  scheduleId?: string;
};

export const VoteUpdateForm = ({ scheduleId }: VoteUpdateFormProps) => {
  const defaultValues: FormValues = {
    title: "",
    multipleFlag: false,
    contents: [{ value: "" }, { value: "" }, { value: "" }],
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await sleep(1000);
    alert(JSON.stringify(data));
  };

  console.log(watch());

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

        <FormControl id="contents" isInvalid={Boolean(errors.contents)}>
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
          <FormControl id="option">
            <Stack spcaing={2}>
              {fields.map((item, index) => (
                <div key={item.id}>
                  <Controller
                    control={control}
                    name={`contents.${index}`}
                    render={({ field }) => (
                      <InputGroup key={index}>
                        <Input
                          placeholder="항목을 입력하세요"
                          color="#71809"
                          {...register(`contents.${index}`)}
                          {...field.value}
                        />
                        <InputRightElement
                          children={<IoCloseSharp color="#757575" />}
                          onClick={() => remove(index)}
                        />
                      </InputGroup>
                    )}
                  />
                </div>
              ))}
            </Stack>
            {/* <FormErrorMessage>{errors.contents?.message}</FormErrorMessage> */}
          </FormControl>

          <TextWithIcon
            w="full"
            marginTop={4}
            icon={<IoAddSharp />}
            onClick={() => {
              append({ value: "" });
            }}
          >
            항목 추가
          </TextWithIcon>
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
