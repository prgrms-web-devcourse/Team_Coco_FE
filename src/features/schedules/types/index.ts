import { MemberSimpleResponse } from "@/features/memo/types";

export type Theme = "FOOD" | "ART" | "ACTIVITY" | "HISTORY" | "NATURE";

export type ScheduleSimpleResponse = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  themes: Theme[];
};

export type ScheduleDetailResponse = {
  id: number;
  memberSimpleResponse: MemberSimpleResponse[];
  scheduleSimpleResponse: ScheduleSimpleResponse;
  spotResponseList: ScheduleSpotResponse[];
};

export type DetailSpotResponse = DailyScheduleSpotCreationRequest & {
  id: number;
}; // API 속성 명이 date => dateOrder, order => spotOder로 모두 업데이트 시 아래 type과 동일

export type ScheduleSpotResponse = SpotResponse & {
  id: number;
  date: number;
  order: number;
};

export type DailyPlaceTemp = SpotResponse & {
  dateOrder: number;
  order: number;
}; // API 속성 명모두 업데이트 시 아래 type과 동일

export type DailyPlace = SpotResponse & {
  dateOrder: number;
  spotOrder: number;
};

export type SpotResponse = {
  spotId: number;
  addressName: string;
  phone: string;
  placeName: string;
  position: Position;
  roadAddressName: string;
};

export type Position = {
  lat: number;
  lng: number;
};

export type ScheduleCreationRequest = {
  dailyScheduleSpotCreationRequests: DailyScheduleSpotCreationRequest[];
  startDate: string;
  endDate: string;
  themes: Theme[];
  title: string;
};

export type ChecklistCreationRequest = {
  day: number;
  title: string;
};

export type ChecklistResponse = {
  id: number;
  checked: boolean;
  content: string;
  day: number;
};

export type DailyScheduleSpotResponse = {
  spotId: number;
  date: string;
  order: number;
};

export type DailyScheduleSpotCreationRequest = {
  addressName: string;
  dateOrder: number;
  spotOrder: number;
  phone: string;
  placeName: string;
  position: Position;
  roadAddressName: string;
  spotId: number;
};

export type ScheduleModificationRequest = {
  title: string;
  themes: Theme[];
  dailyScheduleSpotCreationRequest: {}[];
};
