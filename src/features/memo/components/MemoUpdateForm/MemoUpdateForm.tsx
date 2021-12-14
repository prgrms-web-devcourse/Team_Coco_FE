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
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";

const dummy = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    content: "ㅇㄹ\n\nㅇㄹㅇㄹ",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    content:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    content:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    content:
      "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    content:
      "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    content:
      "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    content:
      "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
];

const schema = yup.object().shape({
  title: yup.string().min(1).max(16).required(),
  content: yup.string().min(1).max(255).required(),
});

type FormValues = {
  title: string;
  content: string;
};

type MemoUpdateFormProps = {
  memoId?: string;
};

export const MemoUpdateForm = (props: MemoUpdateFormProps) => {
  const { memoId } = props;
  const memo = dummy.find((data) => data.id === Number(memoId));

  const defaultValues: FormValues = {
    title: memo ? memo.title : "",
    content: memo ? memo.content : "",
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
          <FormErrorMessage>
            {errors.title && "제목은 1자 이상 16자 이하이어야 합니다."}
          </FormErrorMessage>
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
          <FormErrorMessage>
            {errors.content && "내용은 1자 이상 255자 이하이어야 합니다."}
          </FormErrorMessage>
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
