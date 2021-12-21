import { HStack, Spacer, Box, Text, Stack, Input } from "@chakra-ui/react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useParams, useLocation } from "react-router-dom";

import { useVoteData } from "@/features/vote/hooks";
import { VotingContentResponse } from "@/features/vote/types";

export const BodyAfterVote = () => {
  const { voteId } = useParams();
  const { state: scheduleId } = useLocation();

  const { data: vote } = useVoteData({
    scheduleId: Number(scheduleId),
    votingId: Number(voteId),
  });

  const { title, votingContentResponses } = vote;

  const maxCount = Math.max(
    ...(votingContentResponses || []).map(
      ({ numOfParticipants }) => numOfParticipants
    )
  );

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
      {votingContentResponses?.map(
        (option: VotingContentResponse, index: number) => (
          <HStack key={option.id} spacing={4} flex={1}>
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
        )
      )}
    </Stack>
  );
};
