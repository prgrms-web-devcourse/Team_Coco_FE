export type Gender = "FEMALE" | "MALE";

export type UserDetailResponse = {
  id: number;
  birth: string;
  email: string;
  gender: Gender;
  name: string;
  nickname: string;
  profileImage: string;
};

export type UserSimpleResponse = {
  id: number;
  nickname: string;
};

export type Friends = UserSimpleResponse[];
