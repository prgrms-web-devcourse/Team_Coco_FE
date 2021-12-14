import { useQuery } from "react-query";

import { VotingSimpleResponse } from "../types";

import { axios } from "@/lib/axios";

export type GetVotesDTO = {
  scheduleId: number;
};

export const getVotes = ({
  scheduleId,
}: GetVotesDTO): Promise<VotingSimpleResponse[]> => {
  return axios.get(`/schedules/${scheduleId}/votings`);
};

export type UseVotesDataProps = GetVotesDTO;

export const useVotesData = ({ scheduleId }: UseVotesDataProps) => {
  const { data = [] } = useQuery(["votes", scheduleId], () =>
    getVotes({ scheduleId })
  );
  return data;
};
