import { Box, Flex, Spacer } from "@chakra-ui/react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { ActionsMenu } from "@/components/ActionsMenu";
import { User } from "@/components/User";
import { useMyProfileData } from "@/features/user/hooks";
import { useVoteData, useDeleteVote } from "@/features/vote/hooks";

type VoteHeaderProps = {
  voteId?: string;
  scheduleId?: string;
};

export const VoteHeader = ({ voteId, scheduleId }: VoteHeaderProps) => {
  const navigate = useNavigate();
  const { data: vote } = useVoteData({
    scheduleId: Number(scheduleId),
    votingId: Number(voteId),
  });

  const { data: myprofile } = useMyProfileData();

  const { mutateAsync: deleteVote } = useDeleteVote();

  const onDelete = async () => {
    await deleteVote({
      votingId: Number(voteId),
      scheduleId: Number(scheduleId),
    });

    navigate("/note", { state: scheduleId });
  };

  const { memberSimpleResponse } = vote;

  return (
    <Box padding={1} height="100px">
      <Flex height="100px" alignItems="center">
        <User size="md" nickname={memberSimpleResponse?.nickname} />
        <Spacer />
        {myprofile?.id === memberSimpleResponse?.id ? (
          <ActionsMenu icon={<IoEllipsisHorizontalSharp />}>
            <Box onClick={() => onDelete()} color="red">
              삭제
            </Box>
            <Box color="gray.500">취소</Box>
          </ActionsMenu>
        ) : null}
      </Flex>
    </Box>
  );
};
