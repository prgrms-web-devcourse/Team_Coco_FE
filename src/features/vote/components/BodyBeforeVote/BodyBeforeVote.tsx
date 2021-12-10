import {
  VStack,
  HStack,
  Spacer,
  Checkbox,
  Text,
  Stack,
} from "@chakra-ui/react";

import { SaveButton } from "@/features/vote/components";
const dummy = {
  option: ["한식", "중식", "양식", "일식", "괴식"],
};

type BodyBeforeVoteType = {
  voteId: string | undefined;
};

export const BodyBeforeVote = ({ voteId }: BodyBeforeVoteType) => {
  const { option } = dummy;

  return (
    <VStack height="full" spacing={4}>
      <Stack marginTop={4} spacing={4} w="full">
        {option.map((value, index) => (
          <HStack key={index} spacing={4} flex={1}>
            <Checkbox size="lg" colorScheme="cyan" value={index} />
            <HStack
              w="100%"
              padding={4}
              bg="gray.100"
              height="32px"
              alignItems="center"
              borderRadius="6"
            >
              <Text>{value}</Text>
              <Spacer />
              <Text>n명</Text>
            </HStack>
          </HStack>
        ))}
      </Stack>
      <Spacer />
      <SaveButton />
    </VStack>
  );
};
