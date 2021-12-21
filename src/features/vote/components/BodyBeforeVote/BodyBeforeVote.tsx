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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { useVoteData, useModifyVote } from "@/features/vote/hooks";

const defaultValues: Record<string, boolean> = {};

export const BodyBeforeVote = () => {
  const navigate = useNavigate();
  const { voteId } = useParams();
  const { state: scheduleId } = useLocation();

  const { data: vote, isLoading } = useVoteData({
    scheduleId: Number(scheduleId),
    votingId: Number(voteId),
  });

  const { title, votingContentResponses } = vote;

  const [checkedOptions, setCheckedOptions] = useState(defaultValues);

  const checkedOptionHandler = (idx: string, isChecked: boolean) => {
    setCheckedOptions((prev) => ({ ...prev, [idx]: isChecked }));
  };

  const checkHandler = ({ target }: any) => {
    checkedOptionHandler(target.value, target.checked);
  };

  const { mutateAsync: modifyVote } = useModifyVote();

  const onSubmit = async () => {
    const map = { votingMap: checkedOptions };
    await modifyVote({
      scheduleId: Number(scheduleId),
      votingId: Number(voteId),
      data: map,
    });

    navigate("/note", { state: scheduleId });
  };

  return (
    <Stack spacing={4}>
      {isLoading && (
        <Center>
          <Spinner color="cyan.500" />
        </Center>
      )}
      <Box minHeight="40px">
        <Input
          fontSize="md"
          color="gray.600"
          fontWeight="bold"
          variant="flushed"
          value={title || ""}
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
              {votingContentResponses?.map((option) => (
                <HStack key={option.id} spacing={4}>
                  <Checkbox
                    size="lg"
                    colorScheme="cyan"
                    value={option.id}
                    onChange={checkHandler}
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
          {!isLoading && (
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
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
