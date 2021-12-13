import {
  VStack,
  HStack,
  Spacer,
  Checkbox,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";

const dummy = {
  option: ["한식", "중식", "양식", "일식", "괴식"],
};

type BodyBeforeVoteProps = {
  voteId: string | undefined;
};

export const BodyBeforeVote = (props: BodyBeforeVoteProps) => {
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
      <Button type="submit" size="lg" color="white" bg="cyan.600" isFullWidth>
        투표하기
      </Button>
    </VStack>
  );
};
