import { useMutation, useQueryClient } from "react-query";

import { VotingRequest } from "../types";

import { axios } from "@/lib/axios";

export type ModifyVoteDTO = {
  scheduleId: number;
  votingId: number;
  data: VotingRequest;
};

export const modifyVote = ({
  scheduleId,
  votingId,
  data,
}: ModifyVoteDTO): Promise<void> => {
  return axios.patch(`/schedules/${scheduleId}/votings/${votingId}`, data);
};

export const useModifyVote = () => {
  const queryClient = useQueryClient();

  return useMutation(modifyVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["votes"]);
    },
  });
};
