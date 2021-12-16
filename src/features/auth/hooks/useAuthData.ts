import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import type { LoginRequest, SignUpRequest } from "../types";

import { axios } from "@/lib/axios";
import { storage } from "@/utils/storage";

export type LoginDTO = {
  data: LoginRequest;
};

export const login = ({ data }: LoginDTO): Promise<AxiosResponse> => {
  return axios.post(`/login`, data);
};

export const useLoginData = () => {
  const navigate = useNavigate();

  return useMutation(login, {
    onSuccess: ({ headers: { token } }) => {
      storage.setToken(token);
      navigate("/schedules");
    },
  });
};

export type SignUpDTO = {
  data: SignUpRequest;
};

export const signUp = ({ data }: SignUpDTO): Promise<AxiosResponse> => {
  return axios.post(`/register`, data);
};

export const useSignUpData = () => {
  const navigate = useNavigate();

  return useMutation(signUp, {
    onSuccess: () => {
      navigate("/login");
    },
  });
};

export const logout = (): Promise<unknown> => {
  return axios.post(`/logout`);
};

export const useLogoutData = () => {
  return useMutation(logout);
};
