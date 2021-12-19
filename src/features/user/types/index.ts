export type Gender = "DEFAULT" | "FEMALE" | "MALE";

export type UserDetailResponse = {
  id: number;
  birth: string;
  email: string;
  gender: Gender;
  name: string;
  nickname: string;
  profileImage: string;
};
