import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import type { LoginRequest, SignUpRequest, LoginResponse } from "../types";

import { axios } from "@/lib/axios";
import { storage } from "@/utils/storage";

export type LoginDTO = {
  data: LoginRequest;
};

export const login = ({ data }: LoginDTO): Promise<LoginResponse> => {
  return axios.post(`/login`, data).then((response) => response.data);
};

export const useLoginData = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation(login, {
    onSuccess: ({ token, id }) => {
      storage.setToken(token);
      storage.setUserId(id);
      toast({
        title: "로그인에 성공했습니다",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
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
  const toast = useToast();

  return useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: "회원가입에 성공했습니다",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
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
