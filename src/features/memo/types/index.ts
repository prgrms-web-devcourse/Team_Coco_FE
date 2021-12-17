export type MemberSimpleResponse = {
  id: number;
  imageUrl: string;
  nickname: string;
};

export type MemoDetailResponse = {
  content: string;
  id: number;
  memberSimpleResponse: MemberSimpleResponse;
  // ownerAge: number;
  // ownerGender: string;
  // ownerId: number;
  // ownerNickname: string;
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
