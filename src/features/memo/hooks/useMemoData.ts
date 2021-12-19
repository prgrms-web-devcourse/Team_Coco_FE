import { useQuery, useMutation, useQueryClient } from "react-query";

import type {
  MemoRequest,
  MemoCreationRequest,
  MemoDetailResponse,
} from "../types";

import { axios } from "@/lib/axios";

export type GetMemoDTO = {
  memoId: number;
  scheduleId: number;
};

export const getMemo = ({
  memoId,
  scheduleId,
}: GetMemoDTO): Promise<MemoDetailResponse> => {
  return axios
    .get(`/schedules/${scheduleId}/memos/${memoId}`)
    .then((response) => response.data);
};

export type UseMemoDataProps = GetMemoDTO;

export const useMemoData = ({ memoId, scheduleId }: UseMemoDataProps) => {
  const { data = {} as MemoDetailResponse, ...rest } = useQuery(
    ["memos", memoId, scheduleId],
    () => getMemo({ memoId, scheduleId })
  );
  return { data, ...rest };
};

export type CreateMemoDTO = {
  data: MemoCreationRequest;
  scheduleId: number;
};

export const createMemo = ({
  data,
  scheduleId,
}: CreateMemoDTO): Promise<number> => {
  return axios
    .post(`/schedules/${scheduleId}/memos`, data)
    .then((response) => response.data);
};

export const useCreateMemo = () => {
  const queryClient = useQueryClient();

  return useMutation(createMemo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["memos"]);
    },
  });
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
