import { SimpleGrid, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useMemosData } from "@/features/note/hooks";

type MemoType = {
  id: number;
  title: string;
  content: string;
};

type ThumbnailGridProps = {
  scheduleId: string;
};

export const MemoList = ({ scheduleId: id }: ThumbnailGridProps) => {
  const { data: memosData } = useMemosData({
    scheduleId: parseInt(id, 10),
  });

  return (
    <SimpleGrid columns={2} spacing={4}>
      {memosData.map((memo: MemoType) => (
        <ChakraLink as={Link} to={`/memo/${memo.id}`} state={id} key={memo.id}>
          <Box
            padding={4}
            height={230}
            backgroundColor="gray.100"
            borderRadius={6}
          >
            <Text fontSize="md" color="gray.600" isTruncated>
              {memo.title}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={8}>
              {memo.content}
            </Text>
          </Box>
        </ChakraLink>
      ))}
    </SimpleGrid>
  );
};
