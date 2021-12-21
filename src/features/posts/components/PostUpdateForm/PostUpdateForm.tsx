import {
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import {
  useCreatePostData,
  useModifyPostData,
  usePostData,
} from "@/features/posts/hooks";
import { useCitiesData } from "@/features/posts/hooks";
import type { City } from "@/features/posts/types";
import { useSchedulesData } from "@/features/schedules/hooks";
import { isEmpty } from "@/utils/assertion";

const schema = yup.object().shape({
  title: yup.string().min(1).max(16).required(),
  content: yup.string().min(1).max(10000).required(),
  scheduleId: yup.number().required(),
  city: yup.string().required(),
});

const defaultValues: FormValues = {
  city: "서울",
  content: "",
  title: "",
};

type FormValues = {
  city: City;
  content: string;
  scheduleId?: number;
  title: string;
};

type PostUpdateFormProps = {
  postId?: string;
};

export const PostUpdateForm = ({ postId }: PostUpdateFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { data: schedules } = useSchedulesData();
  const { data: post, isFetching } = usePostData({
    postId: postId ? Number(postId) : null,
    enabled: !!postId,
    refetchOnWindowFocus: false,
  });
  const { data: cities } = useCitiesData();

  const { mutateAsync: createPost } = useCreatePostData();
  const { mutateAsync: modifyPost } = useModifyPostData();

  const mode = postId ? "modify" : "create";

  useEffect(() => {
    if (isEmpty(post)) return;
    const { content, title, scheduleId, city } = post;
    reset({ content, title, scheduleId, city });
  }, [post, reset]);

  const onSubmit: SubmitHandler<FormValues> = async ({
    scheduleId,
    ...rest
  }) => {
    if (!scheduleId) return;
    await (mode === "create"
      ? createPost({ data: { scheduleId, ...rest } })
      : modifyPost({ data: { scheduleId, ...rest }, postId: Number(postId!) }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} height={580}>
        <Flex marginTop={4}>
          <FormControl id="city">
            <VisuallyHidden>
              <FormLabel>도시</FormLabel>
            </VisuallyHidden>
            <Select isInvalid={Boolean(errors.city)} {...register("city")}>
              {cities.map((city) => {
                return (
                  <option key={city} value={city}>
                    {city}
                  </option>
                );
              })}
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
                {schedules.map(({ id: scheduleId, title }) => {
                  return (
                    <option key={scheduleId} value={scheduleId}>
                      {title}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Flex>
        <FormControl id="title" isInvalid={Boolean(errors.title)}>
          <VisuallyHidden>
            <FormLabel>제목</FormLabel>
          </VisuallyHidden>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            {...register("title")}
            variant="flushed"
            disabled={isFetching}
          />
          <FormErrorMessage>
            {errors.title && "제목은 1 ~ 16자 이내여야 합니다."}
          </FormErrorMessage>
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
            disabled={isFetching}
            {...register("content")}
          />
        </FormControl>
      </Stack>
      <Button
        type="submit"
        colorScheme="cyan"
        size="lg"
        isFullWidth
        my={4}
        isLoading={isSubmitting}
      >
        포스트 {mode === "modify" ? "수정" : "작성"}하기
      </Button>
    </form>
  );
};
