import { useQuery } from "react-query";

import type { UserDetailResponse } from "@/features/user/types";
import { axios } from "@/lib/axios";

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
