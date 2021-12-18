import {
  Stack,
  FormControl,
  VisuallyHidden,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useCreateMemo } from "@/features/memo/hooks";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(1, "제목은 최소 1자 이상이어야 합니다.")
    .max(16, "제목은 최대 16자 이하이어야 합니다.")
    .required(),
  content: yup
    .string()
    .min(1, "본문은 최소 1자 이상이어야 합니다.")
    .max(255, "본문은 최대 225자 이하이어야 합니다.")
    .required(),
});

type FormValues = {
  title: string;
  content: string;
};

type MemoUpdateFormProps = {
  memoId?: string;
};

export const MemoUpdateForm = ({ memoId }: MemoUpdateFormProps) => {
  const { state: scheduleId } = useLocation();
  const navigate = useNavigate();

  const defaultValues: FormValues = {
    // 메모 수정용
    // title: memo?.title || "",
    // content: memo?.content || "",
    title: "",
    content: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync: createMemo } = useCreateMemo();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createMemo({
      data,
      scheduleId: Number(scheduleId),
    });

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
        <FormControl
          id="content"
          flexGrow={1}
          isInvalid={Boolean(errors.content)}
        >
          <VisuallyHidden>
            <FormLabel>본문</FormLabel>
          </VisuallyHidden>
          <Textarea
            flexGrow={1}
            minH="350px"
            maxH="350px"
            placeholder="내용을 입력하세요"
            {...register("content")}
          />
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          size="lg"
          color="white"
          bg="cyan.600"
          isLoading={isSubmitting}
        >
          메모 {memoId ? "수정하기" : "생성하기"}
        </Button>
      </Stack>
    </form>
  );
};
