import {
  FormControl,
  FormLabel,
  Flex,
  Stack,
  VisuallyHidden,
  Input,
  Textarea,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { useCreatePostData } from "@/features/posts/hooks";

const schema = yup.object().shape({
  title: yup.string().min(1).max(16).required(),
  content: yup.string().min(1).required(),
});

const defaultValues: FormValues = {
  city: "123",
  content: "",
  title: "",
  scheduleId: 1,
};

type FormValues = {
  city: string;
  content: string;
  scheduleId: number;
  title: string;
};

type PostUpdateFormProps = {
  postId?: string;
};

export const PostUpdateForm = ({ postId }: PostUpdateFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: createPost } = useCreatePostData();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createPost({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} height={580}>
        <Flex marginTop={4}>
          <FormControl id="city">
            <VisuallyHidden>
              <FormLabel>도시</FormLabel>
            </VisuallyHidden>
            <Select placeholder="도시를 선택해 주세요" {...register("city")}>
              <option value="all">전체</option>
              <option>서울</option>
              <option>제주</option>
              <option>부산</option>
              <option>대전</option>
            </Select>
          </FormControl>
          <Box flexShrink={0} ml={4}>
            <FormControl id="schedule">
              <VisuallyHidden>
                <FormLabel>일정</FormLabel>
              </VisuallyHidden>
              <Select
                placeholder="자랑할 여행을 선택해 주세요"
                {...register("scheduleId")}
              >
                <option>경주졸업여행</option>
                <option>4박5일 댕댕이와 제주 여행</option>
                <option>부산먹방투어</option>
                <option>무박2일</option>
              </Select>
            </FormControl>
          </Box>
        </Flex>
        <Box bgColor="gray.100" minHeight={200}>
          <i>여행 세부 일정 컴포넌트</i>
        </Box>
        <FormControl id="title" isInvalid={Boolean(errors.title)}>
          <VisuallyHidden>
            <FormLabel>제목</FormLabel>
          </VisuallyHidden>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            {...register("title")}
            variant="flushed"
          />
        </FormControl>
        <FormControl id="body" isInvalid={Boolean(errors.content)}>
          <VisuallyHidden>
            <FormLabel>본문</FormLabel>
          </VisuallyHidden>
          <Textarea
            height={200}
            maxHeight={220}
            variant="unstyled"
            placeholder="내용을 입력해주세요."
            {...register("content")}
          />
        </FormControl>
      </Stack>
      <Button
        type="submit"
        color="white"
        bg="cyan.600"
        size="lg"
        isFullWidth
        my={4}
        isLoading={isSubmitting}
      >
        포스트 게시하기
      </Button>
    </form>
  );
};
