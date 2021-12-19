import {
  SimpleGrid,
  Box,
  Stack,
  Text,
  Textarea,
  Center,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { CustomSpinner } from "@/components/CustomSpinner";
import { useMemosData } from "@/features/note/hooks";

type MemoType = {
  id: number;
  title: string;
  content: string;
};

type MemoListProps = {
  scheduleId: string;
};

export const MemoList = ({ scheduleId: id }: MemoListProps) => {
  const { data: memosData, isLoading } = useMemosData({
    scheduleId: parseInt(id, 10),
  });

  return (
    <Stack>
      {isLoading && (
        <Center py="8">
          <CustomSpinner />
        </Center>
      )}
      <SimpleGrid columns={2} spacing={4}>
        {memosData.map((memo: MemoType) => (
          <ChakraLink
            as={Link}
            to={`/memo/${memo.id}`}
            state={id}
            key={memo.id}
          >
            <Box
              padding={4}
              height={230}
              backgroundColor="gray.100"
              borderRadius={6}
            >
              <Text fontSize="md" color="gray.600" isTruncated>
                {memo.title}
              </Text>
              <Textarea
                height={160}
                fontSize="sm"
                color="gray.500"
                noOfLines={8}
                isReadOnly
                resize="none"
                variant="unstyled"
              >
                {memo.content}
              </Textarea>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
