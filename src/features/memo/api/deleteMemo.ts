import { useMutation, useQueryClient } from "react-query";

import { axios } from "@/lib/axios";

export type DeleteMemoDTO = {
  scheduleId: number;
  memoId: number;
};

export const deleteMemo = ({
  memoId,
  scheduleId,
}: DeleteMemoDTO): Promise<void> => {
  return axios.delete(`/schedules/${scheduleId}/memos/${memoId}`);
};

export const useDeleteMemo = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteMemo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["memos"]);
    },
  });
};
