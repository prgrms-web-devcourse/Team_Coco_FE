import { SimpleGrid, Box, Link as ChakraLink } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MemoThumbnail } from "../MemoThumbnail";
import { VoteThumbnail } from "../VoteThumbnail";

import { useMemosData } from "@/features/note/hooks";

const dummy = [
  {
    id: 1,
    memberCount: 0,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    content:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et dummy\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    memberCount: 1,
    title: "qui est esse",
    content:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    memberCount: 4,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    content:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    id: 4,
    memberCount: 0,
    title: "eum et est occaecati",
    content:
      "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    id: 5,
    memberCount: 1,
    title: "nesciunt quas odio",
    content:
      "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    id: 6,
    memberCount: 2,
    title: "dolorem eum magni eos aperiam quia",
    content:
      "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    id: 7,
    memberCount: 0,
    title: "magnam facilis autem",
    content:
      "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
];

type MemoType = {
  id: number;
  title: string;
  content?: string;
  memberCount?: number;
};

type ThumbnailGridProps = {
  tab: string;
  scheduleId: string;
};

export const ThumbnailGrid = ({ tab, scheduleId: id }: ThumbnailGridProps) => {
  console.log("notepage", id);

  // const [memosData, setItems] = useState<ItemType[]>(dummy);

  const { data: memosData } = useMemosData({
    scheduleId: parseInt(id, 10),
  });

  console.log(memosData);

  /** dummy 데이터로 교체했습니다.
  const [items, setItems] = useState<dummyType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      const json = await response.json();
      setItems([...items, ...json]);
    })();
  }, []);
  */

  return (
    <SimpleGrid columns={2} spacing={4}>
      {memosData.map((memo: MemoType) => (
        <ChakraLink
          as={Link}
          to={`/${tab}/${memo.id}`}
          state={id}
          key={memo.id}
        >
          <Box
            padding={4}
            height={tab === "memo" ? "230px" : "100px"}
            backgroundColor="gray.100"
            borderRadius={6}
          >
            {tab === "memo" ? (
              <MemoThumbnail title={memo.title} content={memo.content} />
            ) : (
              <VoteThumbnail
                title={memo.title}
                memberCount={memo.memberCount}
              />
            )}
          </Box>
        </ChakraLink>
      ))}
    </SimpleGrid>
  );
};
