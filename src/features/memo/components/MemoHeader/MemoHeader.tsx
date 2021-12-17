import { Box, Flex, Spacer } from "@chakra-ui/react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ActionsMenu } from "@/components/ActionsMenu";
import { User } from "@/components/User";
import { useMemoData, useDeleteMemo } from "@/features/memo/hooks";

type MemoHeaderProps = {
  memoId?: string;
  scheduleId?: string;
};

export const MemoHeader = ({ memoId, scheduleId }: MemoHeaderProps) => {
  const navigate = useNavigate();

  const { data } = useMemoData({
    memoId: Number(memoId),
    scheduleId: Number(scheduleId),
  });

  const { memberSimpleResponse } = data;

  const { mutateAsync: deleteMemo } = useDeleteMemo();

  const onDelete = async () => {
    await deleteMemo({
      memoId: Number(memoId),
      scheduleId: Number(scheduleId),
    });

    navigate("/note", { state: scheduleId });
  };

  return (
    <Box padding={1} height="100px">
      <Flex height="100px" alignItems="center">
        <User size="md" nickname={memberSimpleResponse?.nickname} />
        <Spacer />
        <ActionsMenu icon={<IoEllipsisHorizontalSharp />}>
          <Box onClick={() => onDelete()} color="red">
            삭제
          </Box>
          <Box as={Link} to={`/memo/update/${memoId}`} state={scheduleId}>
            수정
          </Box>
          <Box color="gray.500">취소</Box>
        </ActionsMenu>
      </Flex>
    </Box>
  );
};
