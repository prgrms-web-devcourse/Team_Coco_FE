import { useToast } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  PostCreationRequest,
  PostResponse,
  PostsResponse,
  PostCreationResponse,
} from "../types";

import { axios } from "@/lib/axios";
import { filterFalsy } from "@/utils/object";

export type GetPostsDTO = {
  sorting: "최신순";
  searchingTheme: "ALL";
  searchingCity: "전체";
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
    .then((response) => response.data.content);
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
      navigate(`/posts/${postId}`);
    },
  });
};
