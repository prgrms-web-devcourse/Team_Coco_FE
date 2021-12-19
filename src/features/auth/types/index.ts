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
  gender: "남성" | "여성";
  name: string;
  nickname: string;
  password: string;
};
