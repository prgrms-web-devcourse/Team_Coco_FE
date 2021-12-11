import {
  VStack,
  FormControl,
  Input,
  Textarea,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const dummy = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et dummy\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
];

type MemoUpdateFormProps = {
  memoId?: string;
};

export const MemoUpdateForm = (props: MemoUpdateFormProps) => {
  const { memoId } = props;

  const memo = dummy.find((data) => data.id === Number(memoId));

  return (
    <form>
      <VStack marginTop={4} spacing={4} height="550px">
        <FormControl id="title" isRequired>
          <Input
            placeholder="제목을 입력하세요"
            value={memo?.title}
            onChange={() => {}}
            variant="flushed"
          />
        </FormControl>
        <FormControl id="body" flexGrow={1} isRequired>
          <Textarea
            height="100%"
            placeholder="내용을 입력하세요"
            value={memo?.body}
            onChange={() => {}}
            variant="unstyled"
          />
        </FormControl>
        <HStack w="full" spacing={4}>
          <Button
            type="submit"
            size="lg"
            flexGrow={1}
            color="white"
            bg="cyan.600"
          >
            메모 {memoId ? "수정하기" : "생성하기"}
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};