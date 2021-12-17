import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  VotingRequest,
  VotingCreationRequest,
  VotingDetailResponse,
  // VotingSimpleResponse,
} from "../types";

import { axios } from "@/lib/axios";

// export type GetVotesDTO = {
//   scheduleId: number;
// };

// export const getVotes = ({
//   scheduleId,
// }: GetVotesDTO): Promise<VotingSimpleResponse[]> => {
//   return axios.get(`/schedules/${scheduleId}/votings`);
// };

// export type UseVotesDataProps = GetVotesDTO;

// export const useVotesData = ({ scheduleId }: UseVotesDataProps) => {
//   const { data = [], ...rest } = useQuery(["votes", scheduleId], () =>
//     getVotes({ scheduleId })
//   );
//   return { data, ...rest };
// };
/////////////////////////////////////////////////////////
export type GetVoteDTO = {
  scheduleId: number;
  votingId: number;
};

export const getVote = ({
  scheduleId,
  votingId,
}: GetVoteDTO): Promise<VotingDetailResponse> => {
  return axios
    .get(`/schedules/${scheduleId}/votings/${votingId}`)
    .then((response) => response.data);
};

export type UseVoteDataProps = GetVoteDTO;

export const useVoteData = ({ scheduleId, votingId }: UseVoteDataProps) => {
  const { data = {} as VotingDetailResponse, ...rest } = useQuery(
    ["votes", scheduleId, votingId],
    () => getVote({ scheduleId, votingId })
  );
  return { data, ...rest };
};
/////////////////////////////////////////////////////////
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
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createVote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["votes"]);
      console.log(data);
      // navigate(`/votes/${data}`);
    },
  });
};

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
////////////////////////////////////////////////////
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
  return axios
    .patch(`/schedules/${scheduleId}/votings/${votingId}`, data)
    .then((response) => response.data);
};

export const useModifyVote = () => {
  const queryClient = useQueryClient();

  return useMutation(modifyVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["votes"]);
    },
  });
};
