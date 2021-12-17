import { MemberSimpleResponse } from "@/features/memo/types";

export type ScheduleSimpleResponse = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  themes: string[];
};

export type ScheduleDetailResponse = {
  id: number;
  memberSimpleResponse: MemberSimpleResponse[];
  scheduleSimpleResponse: ScheduleSimpleResponse;
  spotResponseList: ScheduleSpotResponse[];
};

export type ScheduleSpotResponse = SpotResponse & {
  id: number;
  date: number;
  order: number;
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
  themes: string[];
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
  themes: string[];
  dailyScheduleSpotCreationRequest: {}[];
};
