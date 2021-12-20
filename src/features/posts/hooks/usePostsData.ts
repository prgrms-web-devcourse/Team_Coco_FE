import { useToast } from "@chakra-ui/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  PostCreationRequest,
  PostSimpleResponse,
  PostsSimpleResponse,
  PostCreationResponse,
  PostDetailResponse,
  Sorting,
} from "../types";

import type { City } from "@/features/posts/types";
import type { Theme } from "@/features/schedules/types";
import { axios } from "@/lib/axios";
import { filterFalsy } from "@/utils/object";

export const getCities = () => {
  return axios
    .get<City[]>(`/posts/schedules/cities`)
    .then((response) => response.data);
};

export const useCitiesData = () => {
  const { data = [], ...rest } = useQuery(["cities"], getCities);
  return { data, ...rest };
};

export type GetPostByIdDTO = {
  postId: number | null;
};

export const getPostById = ({ postId }: GetPostByIdDTO) => {
  return axios
    .get<PostDetailResponse>(`/posts/schedules/${postId}`)
    .then((response) => response.data);
};

export type UsePostDataProps = GetPostByIdDTO & UseQueryOptions;

export const usePostData = ({ postId, enabled }: UsePostDataProps) => {
  const { data = {} as PostDetailResponse, ...rest } = useQuery(
    ["post", postId],
    () => getPostById({ postId }),
    { enabled }
  );
  return { data, ...rest };
};

export type GetPostsDTO = {
  sorting: Sorting;
  searchingTheme: Theme | "ALL";
  searchingCity: City | "전체";
  search: string;
};

export const getPosts = ({
  sorting,
  searchingTheme,
  searchingCity,
  search,
}: GetPostsDTO) => {
  const params = filterFalsy({
    sorting,
    search,
    searchingTheme,
    searchingCity,
  });

  return axios
    .get<PostsSimpleResponse>(`/posts/schedules`, {
      params,
    })
    .then((response) => response.data);
};

export const usePostsData = ({
  sorting,
  searchingTheme,
  searchingCity,
  search,
}: GetPostsDTO) => {
  const { data = [], ...rest } = useQuery(
    ["posts", sorting, searchingTheme, searchingCity, search],
    () => getPosts({ sorting, searchingTheme, searchingCity, search })
  );
  return { data, ...rest };
};

export const getLikedPosts = () => {
  return axios
    .get<PostSimpleResponse[]>(`/posts/schedules/liked`)
    .then((response) => response.data);
};

export const useLikedPostsData = () => {
  const { data = [], ...rest } = useQuery(["liked-posts"], getLikedPosts);
  return { data, ...rest };
};

export type CreatePostDTO = {
  data: PostCreationRequest;
};

export const getMyPosts = () => {
  return axios
    .get<PostsSimpleResponse>(`/posts/schedules/me`)
    .then((response) => response.data);
};

export const useMyPostsData = () => {
  const { data = [], ...rest } = useQuery(["my-posts"], getMyPosts);
  return { data, ...rest };
};

export const createPost = ({ data }: CreatePostDTO) => {
  return axios
    .post<PostCreationResponse>(`/posts/schedules`, data)
    .then((response) => response.data);
};

export const useCreatePostData = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onSuccess: ({ postId }) => {
      toast({
        title: "게시글 생성에 성공했습니다",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["posts"]);
      navigate(`/posts/${postId}`, { replace: true });
    },
  });
};

export type ModifyPostDTO = {
  data: PostCreationRequest;
  postId: number;
};

export const modifyPost = ({ postId, data }: ModifyPostDTO) => {
  return axios.put(`/posts/schedules/${postId}`, data);
};

export const useModifyPostData = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation(modifyPost, {
    onSuccess: (_, { postId }) => {
      toast({
        title: "게시글 수정에 성공했습니다",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["post", postId]);
      navigate(`/posts/${postId}`, { replace: true });
    },
  });
};

export type DeletePostDTO = {
  postId: number | null;
};

export const deletePost = ({ postId }: DeletePostDTO) => {
  return axios.delete(`/posts/schedules/${postId}`);
};

export const useDeletePostData = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation(deletePost, {
    onSuccess: () => {
      toast({
        title: "게시글 삭제에 성공했습니다",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["posts"]);
      navigate(`/posts`, { replace: true });
    },
  });
};

export type ModifyLikedPostDTO = {
  data: { flag: boolean; schedulePostId: number | null };
  postId: number | null;
};

export const modifyLikedPost = ({ postId, data }: ModifyLikedPostDTO) => {
  return axios
    .post<{ likeCount: number }>(`/posts/schedules/${postId}/liked`, data)
    .then((response) => response.data);
};

export const useModifyLikedPostData = () => {
  const queryClient = useQueryClient();
  return useMutation(modifyLikedPost, {
    onMutate: async ({ postId, data }) => {
      await queryClient.cancelQueries(["post", postId]);

      const previousPost = queryClient.getQueryData<PostDetailResponse>([
        "post",
        postId,
      ]);

      if (previousPost) {
        queryClient.setQueryData(["post", postId], {
          ...previousPost,
          likeCount: data.flag
            ? previousPost.likeCount + 1
            : previousPost.likeCount - 1,
          isLiked: data.flag,
        });
      }

      return { previousPost };
    },
    onError: (error, { postId }, context: any) => {
      if (context?.previousPost) {
        queryClient.setQueryData<PostDetailResponse>(
          ["post", postId],
          context.previousPost
        );
      }
    },
    onSettled: (_, error, { postId }) => {
      queryClient.invalidateQueries(["post", postId]);
    },
  });
};
