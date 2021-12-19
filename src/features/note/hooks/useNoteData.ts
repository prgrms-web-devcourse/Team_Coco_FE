import { useQuery } from "react-query";

import type { MemoSimpleResponse, VoteSimpleResponse } from "../types";

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

export type GetVotesDTO = {
  scheduleId: number;
};

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
