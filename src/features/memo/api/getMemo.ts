import { useQuery } from "react-query";

import { MemoDetailResponse } from "../types";

import { axios } from "@/lib/axios";

export type GetMemoDTO = {
  memoId: number;
  scheduleId: number;
};

export const getMemo = ({
  memoId,
  scheduleId,
}: GetMemoDTO): Promise<MemoDetailResponse> => {
  return axios.get(`/schedules/${scheduleId}/memos/${memoId}`);
};

export type UseMemoData = GetMemoDTO;

export const useMemoData = ({ memoId, scheduleId }: UseMemoData) => {
  const { data = {} } = useQuery(["memos", memoId, scheduleId], () =>
    getMemo({ memoId, scheduleId })
  );
  return { data };
};
