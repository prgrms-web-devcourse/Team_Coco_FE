import { useQuery, useMutation, useQueryClient } from "react-query";

import type { MemoRequest, MemoDetailResponse } from "../types";

import { axios } from "@/lib/axios";

export type GetMemosDTO = {
  scheduleId: number;
};

export type UseMemosDataProps = GetMemosDTO;

const getMemos = ({ scheduleId }: GetMemosDTO) => {
  return axios.get(`/schedules/${scheduleId}/memos`);
};

export const useMemosData = ({ scheduleId }: UseMemosDataProps) => {
  const { data = [], ...rest } = useQuery(["memos", scheduleId], () =>
    getMemos({ scheduleId })
  );
  return { data, ...rest };
};

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

export type UseMemoDataProps = GetMemoDTO;

export const useMemoData = ({ memoId, scheduleId }: UseMemoDataProps) => {
  const { data = {}, ...rest } = useQuery(["memos", memoId, scheduleId], () =>
    getMemo({ memoId, scheduleId })
  );
  return { data, ...rest };
};

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

export const useModifyMemoData = () => {
  const queryClient = useQueryClient();

  return useMutation(modifyMemo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["memos"]);
    },
  });
};

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