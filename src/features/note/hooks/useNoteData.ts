import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  // MemoRequest,
  MemoSimpleResponse,
  // MemoDetailResponse,
  VoteSimpleResponse,
  // MemosDataResponse,
} from "../types";

import { axios } from "@/lib/axios";

type GetMemosDTO = {
  scheduleId: number;
};

const getMemos = ({ scheduleId }: GetMemosDTO) => {
  return axios
    .get<MemoSimpleResponse>(`/schedules/${scheduleId}/memos`)
    .then((response) => response.data);
};

type UseMemosDataProps = GetMemosDTO;

export const useMemosData = ({ scheduleId }: UseMemosDataProps) => {
  const { data = [] as MemoSimpleResponse, ...rest } = useQuery(
    ["memos", scheduleId],
    () => getMemos({ scheduleId })
  );
  return { data, ...rest };
};
///////////////////////////////////////////////
export type GetVotesDTO = {
  scheduleId: number;
};

// export const getVotes = ({
//   scheduleId,
// }: GetVotesDTO): Promise<VotingSimpleResponse[]> => {
//   return axios.get<VoteSimpleResponse>(`/schedules/${scheduleId}/votings`);
// };
export const getVotes = ({ scheduleId }: GetVotesDTO) => {
  return axios
    .get<VoteSimpleResponse>(`/schedules/${scheduleId}/votings`)
    .then((response) => response.data);
};

export type UseVotesDataProps = GetVotesDTO;

export const useVotesData = ({ scheduleId }: UseVotesDataProps) => {
  const { data = [] as VoteSimpleResponse, ...rest } = useQuery(
    ["votes", scheduleId],
    () => getVotes({ scheduleId })
  );
  return { data, ...rest };
};

// export type GetMemoDTO = {
//   memoId: number;
//   scheduleId: number;
// };

// export const getMemo = ({
//   memoId,
//   scheduleId,
// }: GetMemoDTO): Promise<MemoDetailResponse> => {
//   return axios.get(`/schedules/${scheduleId}/memos/${memoId}`);
// };

// export type UseMemoDataProps = GetMemoDTO;

// export const useMemoData = ({ memoId, scheduleId }: UseMemoDataProps) => {
//   const { data = {}, ...rest } = useQuery(["memos", memoId, scheduleId], () =>
//     getMemo({ memoId, scheduleId })
//   );
//   return { data, ...rest };
// };
///////////////////////////////////////////////////////////
// export type CreateMemoDTO = {
//   data: MemoCreationRequest;
//   scheduleId: number;
// };

// export const createMemo = ({
//   data,
//   scheduleId,
// }: CreateMemoDTO): Promise<number> => {
//   return axios
//     .post(`/schedules/${scheduleId}/memos`, data)
//     .then((response) => response.data);
// };

// export const useCreateMemo = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation(createMemo, {
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(["memos"]);
//       console.log(data);
//       // navigate(`/memos/${data}`);
//     },
//   });
// };
///////////////////////////////////////////////////////////
// export type ModifyMemoDTO = {
//   memoId: number;
//   scheduleId: number;
//   data: MemoRequest;
// };

// export const modifyMemo = ({
//   memoId,
//   scheduleId,
//   data,
// }: ModifyMemoDTO): Promise<void> => {
//   return axios.put(`/schedules/${scheduleId}/memos/${memoId}`, data);
// };

// export const useModifyMemoData = () => {
//   const queryClient = useQueryClient();

//   return useMutation(modifyMemo, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["memos"]);
//     },
//   });
// };
///////////////////////////////////////////////////////////
// export type DeleteMemoDTO = {
//   scheduleId: number;
//   memoId: number;
// };

// export const deleteMemo = ({
//   memoId,
//   scheduleId,
// }: DeleteMemoDTO): Promise<void> => {
//   return axios.delete(`/schedules/${scheduleId}/memos/${memoId}`);
// };

// export const useDeleteMemo = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation(deleteMemo, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["memos"]);
//       navigate(`/note`);
//     },
//   });
// };
