import { useMutation, useQueryClient } from "react-query";

import { MemoRequest } from "../types";

import { axios } from "@/lib/axios";

export type ModifyMemoDTO = {
  memoId: number;
  scheduleId: number;
  data: MemoRequest;
};

export const modifyMemo = ({
  memoId,
  scheduleId,
  data,
}: ModifyMemoDTO): Promise<void> => {
  return axios.put(`/schedules/${scheduleId}/memos/${memoId}`, data);
};

export const useModifyMemo = () => {
  const queryClient = useQueryClient();

  return useMutation(modifyMemo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["memos"]);
    },
  });
};
