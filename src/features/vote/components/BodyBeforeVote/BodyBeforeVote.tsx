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

import { useVoteData, useModifyVote } from "@/features/vote/hooks";

type BodyBeforeVoteProps = {
  voteId?: string;
  scheduleId?: string;
};

export const BodyBeforeVote = ({ voteId, scheduleId }: BodyBeforeVoteProps) => {
  const { data: vote } = useVoteData({
    scheduleId: Number(scheduleId),
    votingId: Number(voteId),
  });

  const { title, votingContentResponses } = vote;
  const defaultValues: Record<string, boolean> = {};
  votingContentResponses?.forEach((_, idx) => (defaultValues[idx] = false));

  const [checkedOptions, setCheckedOptions] = useState(defaultValues);

  const checkedOptionHandler = (idx: string, isChecked: boolean) => {
    setCheckedOptions((prev) => ({ ...prev, [idx]: isChecked }));
  };

  const checkHandler = ({ target }: any) => {
    checkedOptionHandler(target.value, target.checked);
  };

  const { mutateAsync: joinVote } = useModifyVote();

  const onSubmit = async () => {
    console.log(checkedOptions);

    const map = { votingMap: checkedOptions };
    await joinVote({
      scheduleId: Number(scheduleId),
      votingId: Number(voteId),
      data: map,
    });
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
              {votingContentResponses?.map((option, idx) => (
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
