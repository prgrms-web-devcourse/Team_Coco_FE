import type { Theme } from "@/features/schedules/types";
import type { Gender } from "@/features/user/types";

export type DailyScheduleSpotResponse = {
  dateOrder: number;
  placeName: string;
  spotId: number;
  spotOrder: number;
};

export type Sorting = "조회순" | "좋아요순" | "댓글순" | "최신순";

export type City =
  | "서울"
  | "부산"
  | "인천"
  | "제주"
  | "대구"
  | "대전"
  | "광주"
  | "수원"
  | "울산"
  | "화성"
  | "전주"
  | "천안"
  | "김해"
  | "평택"
  | "포항"
  | "원주"
  | "세종"
  | "진주"
  | "아산"
  | "춘천"
  | "여수"
  | "순천"
  | "경주"
  | "거제"
  | "목포"
  | "강릉"
  | "양주"
  | "안동"
  | "논산"
  | "동해"
  | "속초"
  | "삼척"
  | "가평"
  | "울릉";

export type PostCreationRequest = {
  city: City;
  content: string;
  scheduleId: number;
  title: string;
};

export type PostCreationResponse = {
  postId: number;
};

export type PostsSimpleResponse = PostSimpleResponse[];

export type PostSimpleResponse = {
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
  city: City;
  comments: CommentResponse[];
  content: string;
  createdAt: string;
  dailyScheduleSpots: DailyScheduleSpotResponse[];
  startDate: string;
  endDate: string;
  gender: Gender;
  isLiked: boolean;
  nickname: string;
  title: string;
  views: number;
  likeCount: number;
  scheduleId: number;
};

export type PostModificationRequest = PostCreationRequest;

export type CommentResponse = {
  commentId: number;
  content: string;
  createdAt: string;
  nickname: string;
  gender: Gender;
  schedulePostWriter: boolean;
  writerId: number;
};

export type CommentCreationRequest = Pick<CommentResponse, "content">;

export type CommentModificationRequest = Pick<CommentResponse, "content">;

export type PostLikeRequest = {
  flag: boolean;
  schedulePostId: number;
};

export type PostLikeResponse = Pick<PostDetailResponse, "likeCount">;
