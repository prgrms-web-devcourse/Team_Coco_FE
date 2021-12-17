export type UserDetailResponse = {
  id: number;
  birth: string;
  email: string;
  gender: "DEFAULT" | "FEMALE" | "MALE";
  name: string;
  nickname: string;
  profileImage: string;
};
