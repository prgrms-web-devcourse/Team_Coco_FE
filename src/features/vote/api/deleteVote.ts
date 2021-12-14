import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { axios } from "@/lib/axios";

export type DeleteVoteDTO = {
  scheduleId: number;
  votingId: number;
};

export const deleteVote = ({
  scheduleId,
  votingId,
}: DeleteVoteDTO): Promise<void> => {
  return axios.delete(`/schedules/${scheduleId}/votings/${votingId}`);
};

export const useDeleteVote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(deleteVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["votes"]);
      navigate("/notes");
    },
  });
};
