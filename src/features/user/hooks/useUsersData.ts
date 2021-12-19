import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "react-query";

import type {
  UserDetailResponse,
  Friends,
  UserSimpleResponse,
} from "@/features/user/types";
import { axios } from "@/lib/axios";
import { storage } from "@/utils/storage";

export const getMyProfile = () => {
  return axios
    .get<UserDetailResponse>(`/profiles`)
    .then((response) => response.data);
};

export const useMyProfileData = () => {
  const { data = {} as UserDetailResponse, ...rest } = useQuery(
    ["my-profile"],
    getMyProfile
  );
  return { data, ...rest };
};

export const getFriends = () => {
  return axios.get<Friends>(`/friends`).then((response) => response.data);
};

export const useFriendsData = () => {
  const userId = storage.getUserId();
  const { data = [], ...rest } = useQuery(["friends", userId], getFriends);
  return { data, ...rest };
};

export type SearchUserByNicknameDTO = {
  nickname: string;
};

export const searchUserByNickname = ({ nickname }: SearchUserByNicknameDTO) => {
  const params = {
    nickname,
  };
  return axios
    .get<UserSimpleResponse[]>(`/users`, { params })
    .then((response) => response.data);
};

export type UseSearchUserDataProps = SearchUserByNicknameDTO & UseQueryOptions;

export const useSearchUserData = ({
  nickname,
  enabled,
}: UseSearchUserDataProps) => {
  const { data = [], ...rest } = useQuery(
    ["users", nickname],
    () => searchUserByNickname({ nickname }),
    { enabled }
  );
  return { data, ...rest };
};

export type AddFriendDTO = {
  data: { memberId: number };
  nickname: string;
};

export const addFriend = ({ nickname, data }: AddFriendDTO) => {
  return axios.post<void>(`/friends`, data);
};

export const useAddFriendData = () => {
  const queryClient = useQueryClient();
  const userId = storage.getUserId();

  return useMutation(addFriend, {
    onMutate: async ({ nickname, data }) => {
      await queryClient.cancelQueries(["users", nickname]);

      const previousUsers = queryClient.getQueryData<UserSimpleResponse[]>([
        "friends",
        userId,
      ]);

      if (previousUsers) {
        queryClient.setQueryData(
          ["friends", userId],
          [{ id: data.memberId, nickname }, ...previousUsers]
        );
      }
      return { previousUsers };
    },
    onError: (error, { nickname }, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<UserSimpleResponse[]>(
          ["friends", userId],
          context.previousUsers
        );
      }
    },
    onSettled: (data, error, { nickname }) => {
      queryClient.invalidateQueries(["users", nickname]);
      queryClient.invalidateQueries(["friends", userId]);
    },
  });
};

export type DeleteFriendDTO = {
  friendId: number;
};

export const deleteFriend = ({ friendId }: DeleteFriendDTO) => {
  return axios.delete(`/friends/${friendId}`);
};

export const useDeleteFriendData = () => {
  const userId = storage.getUserId();
  const queryClient = useQueryClient();
  return useMutation(deleteFriend, {
    onMutate: async ({ friendId }) => {
      await queryClient.cancelQueries(["friends", userId]);

      const previousFriends = queryClient.getQueryData<Friends>([
        "friends",
        userId,
      ]);

      if (previousFriends) {
        queryClient.setQueryData(
          ["friends", userId],
          previousFriends.filter((friend) => friend.id !== friendId)
        );
      }

      return { previousFriends };
    },
    onError: (error, { friendId }, context: any) => {
      if (context?.previousFriends) {
        queryClient.setQueryData<Friends>(
          ["friends", userId],
          context.previousFriends
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["friends", userId]);
    },
  });
};
