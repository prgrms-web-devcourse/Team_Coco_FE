import { MemberSimpleResponse } from "@/features/memo/types";

export type ScheduleSimpleResponse = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  thema: string[];
};

export type ScheduleDetailResponse = {
  id: number;
  memberSimpleResponse: MemberSimpleResponse[];
  scheduleSimpleResponse: ScheduleSimpleResponse;
  spotResponseList: ScheduleSpotResponse[];
};

export type ScheduleSpotResponse = {
  id: number;
  date: string;
  order: number;
  spotResponse: SpotResponse;
};

export type SpotResponse = {
  id: number;
  addressName: string;
  latitude: number;
  longitude: number;
  phone: string;
  placeName: string;
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
  themeList: string[];
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
  date: string;
};

export type DailyScheduleSpotResponse = {
  spotId: number;
  date: string;
  order: number;
};

export type DailyScheduleSpotCreationRequest = {
  addressName: string;
  date: string;
  order: number;
  phone: string;
  placeName: string;
  position: Position;
  roadAddressName: string;
  spotId: number;
};

export type ScheduleModificationRequest = {
  title: string;
  themes: string[];
  dailyScheduleSpotCreationRequest: {}[];
};
