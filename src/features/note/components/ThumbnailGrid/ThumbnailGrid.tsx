import { SimpleGrid, Box, Link as ChakraLink } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { MemoThumbnail } from "../MemoThumbnail";
import { VoteThumbnail } from "../VoteThumbnail";

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

type ThumbnailGridProps = {
  tab: string;
};

export const ThumbnailGrid = (props: ThumbnailGridProps) => {
  const { tab } = props;
  const [items, setItems] = useState(dummy);

  /** dummy 데이터로 교체했습니다.
  const [items, setItems] = useState<{ title: string; body: string }[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      const json = await response.json();
      setItems([...items, json]);
    })();
  }, []);
  */

  return (
    <SimpleGrid columns={2} spacing={4}>
      {items.map((item) => (
        <ChakraLink as={Link} to={`/${tab}/${item.id}`} key={item.id}>
          <Box
            padding={4}
            height={tab === "memo" ? "230px" : "100px"}
            backgroundColor="gray.100"
            borderRadius={6}
          >
            {tab === "memo" ? (
              <MemoThumbnail title={item.title} body={item.body} />
            ) : (
              <VoteThumbnail title={item.title} />
            )}
          </Box>
        </ChakraLink>
      ))}
    </SimpleGrid>
  );
};
