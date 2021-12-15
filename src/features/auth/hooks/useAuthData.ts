import { useMutation, useQueryClient } from "react-query";

import type { LoginRequest } from "../types";

import { axios } from "@/lib/axios";

export type LoginDTO = {
  data: LoginRequest;
};

export const login = ({ data }: LoginDTO): Promise<unknown> => {
  return axios.post(`/login`, data);
};

export const useLoginData = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["login"]);
    },
  });
};

export type RegisterDTO = {
  data: any;
};

export const register = ({ data }: RegisterDTO): Promise<unknown> => {
  return axios.post(`/users`, data);
};

export const useRegisterData = () => {
  const queryClient = useQueryClient();

  return useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const logout = (): Promise<unknown> => {
  return axios.post(`/logout`);
};

export const useLogoutData = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
