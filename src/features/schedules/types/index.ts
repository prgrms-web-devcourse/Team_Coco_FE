import { MemberSimpleResponse } from "@/features/memo/types";

export type Theme = "FOOD" | "ART" | "ACTIVITY" | "HISTORY" | "NATURE";

export type Position = {
  lat: number;
  lng: number;
};

export type ScheduleSimpleResponse = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  themes: Theme[];
};

export type ScheduleDetailResponse = {
  id: number;
  memberSimpleResponses: MemberSimpleResponse[];
  scheduleSimpleResponse: ScheduleSimpleResponse;
  spotResponseList: DetailSpotResponse[];
};

export type DetailSpotResponse = DailyScheduleSpotCreationRequest & {
  id: number;
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

export type DailyPlace = Marker & {
  dateOrder: number;
  spotOrder: number;
};

export type Marker = {
  addressName: string;
  phone: string;
  placeName: string;
  position: Position;
  roadAddressName: string;
  spotId: number;
};

export type ScheduleCreationRequest = {
  dailyScheduleSpotCreationRequests: DailyScheduleSpotCreationRequest[];
  startDate: string;
  endDate: string;
  themes: Theme[];
  title: string;
};

export type ScheduleModificationRequest = {
  title: string;
  themes: Theme[];
  dailyScheduleSpotCreationRequest: {}[];
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
