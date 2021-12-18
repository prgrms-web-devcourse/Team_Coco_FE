import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

import { CommentResponse } from "../types";

import { axios } from "@/lib/axios";

export type GetCommentsByPostDTO = {
  postId: number | null;
};

export const getCommentByPost = ({ postId }: GetCommentsByPostDTO) => {
  return axios
    .get<CommentResponse[]>(`/posts/schedules/${postId}/comments`)
    .then((response) => response.data);
};

export type UseCommentDataProps = GetCommentsByPostDTO & UseQueryOptions;

export const useCommentsData = ({ postId, enabled }: UseCommentDataProps) => {
  const { data = [], ...rest } = useQuery(
    ["comments", postId],
    () => getCommentByPost({ postId }),
    { enabled }
  );
  return { data, ...rest };
};

export type CreateCommentDTO = {
  postId: number | null;
  data: { content: string };
};

export const createComment = ({ postId, data }: CreateCommentDTO) => {
  return axios
    .post<CommentResponse[]>(`/posts/schedules/${postId}/comments`, data)
    .then((response) => response.data);
};

export const useCreateCommentData = () => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};
