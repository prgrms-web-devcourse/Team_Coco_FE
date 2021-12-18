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
  PostResponse,
  PostsResponse,
  PostCreationResponse,
  PostDetailResponse,
} from "../types";

import type { City } from "@/features/posts/types";
import type { Theme } from "@/features/schedules/types";
import { axios } from "@/lib/axios";
import { filterFalsy } from "@/utils/object";

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
  sorting: "최신순";
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
    .get<PostsResponse>(`/posts/schedules`, {
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
    .get<PostResponse[]>(`/posts/schedules/liked`)
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
    .get<PostResponse[]>(`/posts/schedules/me`)
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
    onSuccess: ({ likeCount }) => {
      queryClient.invalidateQueries(["post"]);
    },
  });
};
