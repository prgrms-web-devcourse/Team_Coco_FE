export type PostCreationRequest = {
  city: string;
  content: string;
  scheduleId: number;
  title: string;
};

export type PostCreationResponse = {
  postId: number;
};

export type PostsResponse = {
  content: PostResponse[];
};

export type PostResponse = {
  postId: number;
  city: "ALL" | "BUSAN" | "JEJU" | "SEOUL";
  startDate: string;
  endDate: string;
  genderType: "DEFAULT" | "FEMALE" | "MALE";
  nickname: string;
  themes: ("ACTIVITY" | "ALL" | "ARCHITECT" | "ART" | "FOOD" | "NATURE")[];
  title: string;
  writerId: number;
};
