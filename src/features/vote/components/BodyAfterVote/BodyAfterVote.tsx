import { HStack, Spacer, Box, Text, Stack, Input } from "@chakra-ui/react";
import { IoCheckmarkSharp } from "react-icons/io5";

const dummy = {
  id: 2,
  multipleFlag: false,
  title: "투표 제목입니다",
  numOfTotalParticipants: 0,
  ownerAge: 22,
  ownerGender: "남성",
  ownerId: 0,
  ownerNickname: "mynick",
  votingContentResponses: [
    {
      content: "한식",
      id: 0,
      numOfParticipants: 1,
      participantFlag: true,
    },
    {
      content: "중식",
      id: 0,
      numOfParticipants: 0,
      participantFlag: false,
    },
    {
      content: "양식",
      id: 0,
      numOfParticipants: 4,
      participantFlag: true,
    },
    {
      content: "일식",
      id: 0,
      numOfParticipants: 0,
      participantFlag: false,
    },
    {
      content: "괴식",
      id: 0,
      numOfParticipants: 2,
      participantFlag: false,
    },
  ],
};

type BodyAfterVoteProps = {
  voteId?: string;
  scheduleId?: string;
};

export const BodyAfterVote = ({ voteId, scheduleId }: BodyAfterVoteProps) => {
  const { title, votingContentResponses } = dummy;
  const counts: number[] = [];

  votingContentResponses.forEach((option) =>
    counts.push(option.numOfParticipants)
  );

  const maxCount = Math.max(...counts);

  return (
    <Stack spacing={4}>
      <Input
        minHeight="40px"
        fontSize="md"
        color="gray.600"
        fontWeight="bold"
        variant="flushed"
        value={title}
        disabled
      />
      {votingContentResponses.map((option, index) => (
        <HStack key={index} spacing={4} flex={1}>
          <Box width={8} aria-hidden>
            {option.participantFlag && (
              <IoCheckmarkSharp width={4} size={24} color="#00A3C4" />
            )}
          </Box>
          <HStack
            position="relative"
            w="100%"
            height="32px"
            bg="gray.100"
            borderRadius="6"
            alignItems="center"
            zIndex="10"
          >
            <Box
              position="absolute"
              width={`${(option.numOfParticipants / maxCount) * 100}%`}
              height="100%"
              left="0"
              bg="gray.300"
              borderRadius={6}
              zIndex="50"
            />
            <Text position="absolute" left={0} zIndex="100">
              {option.content}
            </Text>
            <Spacer />
            <Text position="absolute" right={4} zIndex="100">
              {option.numOfParticipants}명
            </Text>
          </HStack>
        </HStack>
      ))}
    </Stack>
  );
};
