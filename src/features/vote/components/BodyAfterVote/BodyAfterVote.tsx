import { HStack, Spacer, Box, Text, Stack } from "@chakra-ui/react";
import { IoCheckmark } from "react-icons/io5";

const dummy = {
  // 옵션 리스트
  option: ["한식", "중식", "양식", "일식", "괴식"],
  // 내가 선택한 옵션
  participate: [true, false, false, true],
  // 옵션별 합계
  total: [4, 1, 0, 2],
};

type BodyAfterVoteType = {
  voteId: string | undefined;
};

export const BodyAfterVote = ({ voteId }: BodyAfterVoteType) => {
  const { option, participate, total } = dummy;
  const counts = Object.values(total);
  const maxCount = Math.max(...counts);

  return (
    <Stack marginTop={4} spacing={4} w="full">
      {option.map((value, index) => (
        <HStack key={index} spacing={4} flex={1}>
          {participate[index] ? <IoCheckmark width={4} /> : <Box width={4} />}
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
              width={`${(total[index] / maxCount) * 100}%`}
              height="100%"
              left="0"
              bg="gray.300"
              borderRadius={6}
              zIndex="50"
            />
            <Text position="absolute" left={0} zIndex="100">
              {value}
            </Text>
            <Spacer />
            <Text position="absolute" right={4} zIndex="100">
              {total[index]}명
            </Text>
          </HStack>
        </HStack>
      ))}
    </Stack>
  );
};
