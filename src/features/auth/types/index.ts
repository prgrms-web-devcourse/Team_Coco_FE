import type { Gender } from "@/features/user/types";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  token: string;
};

export type SignUpRequest = {
  birth: string;
  email: string;
  gender: Gender;
  name: string;
  nickname: string;
  password: string;
};
