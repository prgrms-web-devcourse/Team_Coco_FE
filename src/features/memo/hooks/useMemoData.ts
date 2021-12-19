import { UseQueryProps } from "@chakra-ui/media-query";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  MemoRequest,
  MemoCreationRequest,
  MemoDetailResponse,
} from "../types";

import { axios } from "@/lib/axios";

export type GetMemoByIdDTO = {
  memoId: number | null;
  scheduleId: number;
};

export const getMemoById = ({
  memoId,
  scheduleId,
}: GetMemoByIdDTO): Promise<MemoDetailResponse> => {
  return axios
    .get(`/schedules/${scheduleId}/memos/${memoId}`)
    .then((response) => response.data);
};

export type UseMemoDataProps = GetMemoByIdDTO & UseQueryOptions;

export const useMemoData = ({
  memoId,
  scheduleId,
  enabled,
}: UseMemoDataProps) => {
  const { data = {} as MemoDetailResponse, ...rest } = useQuery(
    ["memos", memoId, scheduleId],
    () => getMemoById({ memoId, scheduleId }),
    { enabled }
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
    onSuccess: () => {
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
