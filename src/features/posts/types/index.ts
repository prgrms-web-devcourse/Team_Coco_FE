import type { Theme } from "@/features/schedules/types";
import type { Gender } from "@/features/user/types";

export type City = "서울" | "부산" | "인천" | "제주";

export type PostCreationRequest = {
  city: City;
  content: string;
  scheduleId: number;
  title: string;
};

export type PostCreationResponse = {
  postId: number;
};

export type PostsResponse = PostResponse[];

export type PostResponse = {
  postId: number;
  city: City;
  startDate: string;
  endDate: string;
  genderType: Gender;
  nickname: string;
  themes: Theme[];
  title: string;
  writerId: number;
};

export type PostDetailResponse = {
  writerId: number;
  nickname: string;
  city: string;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
  dailyScheduleSpots: {
    spotId: number;
    dateOrder: number;
    spotOrder: number;
    placeName: string;
  }[];
  createdAt: string;
  views: number;
  isLiked: boolean;
  likeCount: number;
  comments: CommentResponse[];
};

export type CommentResponse = {
  commentId: number;
  content: string;
  createdAt: string;
  nickname: string;
  schedulePostWriter: boolean;
  writerId: number;
};
