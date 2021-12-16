import {
  Box,
  Text,
  HStack,
  Spacer,
  Stack,
  Button,
  Input,
  FormControl,
  VisuallyHidden,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

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
      participantFlag: false,
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
      numOfParticipants: 2,
      participantFlag: false,
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

type BodyBeforeVoteProps = {
  voteId?: string;
  scheduleId?: string;
};

export const BodyBeforeVote = ({ voteId, scheduleId }: BodyBeforeVoteProps) => {
  const { title, votingContentResponses } = dummy;
  const defaultValues: Record<number, boolean> = {};
  votingContentResponses.forEach((_, idx) => (defaultValues[idx] = false));

  const [checkedOptions, setCheckedOptions] = useState(defaultValues);

  const checkedOptionHandler = (idx: number, isChecked: boolean) => {
    setCheckedOptions((prev) => ({ ...prev, [idx]: isChecked }));
  };

  const checkHandler = ({ target }: any) => {
    checkedOptionHandler(Number(target.value), target.checked);
  };

  const onSubmit = () => {
    alert(JSON.stringify(checkedOptions));
  };

  return (
    <Stack spacing={4}>
      <Box minHeight="40px">
        <Input
          fontSize="md"
          color="gray.600"
          fontWeight="bold"
          variant="flushed"
          value={title}
          disabled
        />
      </Box>
      <Box>
        <Stack h="500px" spacing={2}>
          <FormControl id="options" flexGrow={1}>
            <VisuallyHidden>
              <FormLabel>항목</FormLabel>
            </VisuallyHidden>
            <Stack spacing={2}>
              {votingContentResponses.map((option, idx) => (
                <HStack key={idx} spacing={4}>
                  <Checkbox
                    size="lg"
                    colorScheme="cyan"
                    value={idx}
                    onChange={(e) => checkHandler(e)}
                  />
                  <HStack
                    w="100%"
                    padding={4}
                    bg="gray.100"
                    height="32px"
                    alignItems="center"
                    borderRadius="6"
                  >
                    <Text>{option.content}</Text>
                    <Spacer />
                    <Text>{option.numOfParticipants}명</Text>
                  </HStack>
                </HStack>
              ))}
            </Stack>
          </FormControl>
          <Button
            type="submit"
            size="lg"
            color="white"
            bg="cyan.600"
            isFullWidth
            onClick={() => onSubmit()}
          >
            투표하기
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
