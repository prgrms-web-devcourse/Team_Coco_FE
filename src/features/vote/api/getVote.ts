import { useQuery } from "react-query";

import { VotingDetailResponse } from "../types";

import { axios } from "@/lib/axios";

export type GetVoteDTO = {
  scheduleId: number;
  votingId: number;
};

export const getVote = ({
  scheduleId,
  votingId,
}: GetVoteDTO): Promise<VotingDetailResponse> => {
  return axios.get(`/schedules/${scheduleId}/votings/${votingId}`);
};

export type UseVoteDataProps = GetVoteDTO;

export const useVoteData = ({ scheduleId, votingId }: UseVoteDataProps) => {
  const { data = {} as VotingDetailResponse } = useQuery(
    ["votes", scheduleId, votingId],
    () => getVote({ scheduleId, votingId })
  );
  return { data };
};
