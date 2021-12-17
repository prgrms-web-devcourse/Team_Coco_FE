export type MemberSimpleResponse = {
  id: number;
  nickname: string;
};

export type MemoDetailResponse = {
  id: number;
  content: string;
  ownerAge: number;
  ownerGender: string;
  ownerId: number;
  ownerNickname: string;
  title: string;
};

export type MemoCreationRequest = {
  content: string;
  title: string;
};

export type MemoRequest = {
  content: string;
  title: string;
};
