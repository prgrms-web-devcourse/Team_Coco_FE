import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { VotingCreationRequest } from "../types";

import { axios } from "@/lib/axios";

export type CreateVoteDTO = {
  data: VotingCreationRequest;
  scheduleId: number;
};

export const createVote = ({
  data,
  scheduleId,
}: CreateVoteDTO): Promise<number> => {
  return axios.post(`/schedules/${scheduleId}/votings`, data);
};

export const useCreateVote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createVote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["votes"]);
      navigate(`/memos/${data}`);
    },
  });
};
