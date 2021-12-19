import {
  SimpleGrid,
  Stack,
  Box,
  Flex,
  Spacer,
  Text,
  Center,
  Spinner,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import { TextWithIcon } from "@/components/TextWithIcon";
import { useVotesData } from "@/features/note/hooks";

type VoteType = {
  id: number;
  title: string;
  memberCount: number;
};

type VoteListProps = {
  scheduleId: string;
};

export const VoteList = ({ scheduleId }: VoteListProps) => {
  const { data: votesData, isLoading } = useVotesData({
    scheduleId: parseInt(scheduleId, 10),
  });

  return (
    <Stack>
      {isLoading && (
        <Center py="8">
          <Spinner color="cyan.500" />
        </Center>
      )}
      <SimpleGrid columns={2} spacing={4}>
        {votesData.map((vote: VoteType) => (
          <ChakraLink
            as={Link}
            to={`/vote/${vote.id}`}
            state={scheduleId}
            key={vote.id}
          >
            <Box
              padding={4}
              height={100}
              backgroundColor="gray.100"
              borderRadius={6}
            >
              <Flex direction="column" height="full">
                <Text fontSize="md" color="gray.600" isTruncated>
                  {vote.title}
                </Text>
                <Spacer flexGrow={1} />
                <TextWithIcon
                  justifyContent="flex-end"
                  icon={<IoPersonSharp />}
                >
                  {vote.memberCount}명 참여
                </TextWithIcon>
              </Flex>
            </Box>
          </ChakraLink>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
