import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  useIsMutating,
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

export const useCommentsData = ({
  postId,
  enabled,
  refetchOnWindowFocus,
}: UseCommentDataProps) => {
  const { data = [], ...rest } = useQuery(
    ["comments", postId],
    () => getCommentByPost({ postId }),
    { enabled, refetchOnWindowFocus }
  );
  const isMutating = useIsMutating(["comments"]);
  return { data, ...rest, isMutating };
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

export type DeleteCommentDTO = {
  postId: number | null;
  commentId: number;
};

export const deleteComment = ({ postId, commentId }: DeleteCommentDTO) => {
  return axios.delete(`/posts/schedules/${postId}/comments/${commentId}`);
};

export const useDeleteCommentData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteComment, {
    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries(["comments", postId]);

      const previousComments = queryClient.getQueryData<CommentResponse[]>([
        "comments",
        postId,
      ]);

      if (previousComments) {
        queryClient.setQueryData(
          ["comments", postId],
          previousComments.filter((comment) => {
            return comment.commentId !== commentId;
          })
        );
      }

      return { previousComments };
    },
    onError: (error, { postId }, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData<CommentResponse[]>(
          ["comments", postId],
          context.previousComments
        );
      }
    },
    onSettled: (_, error, { postId }) => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};
