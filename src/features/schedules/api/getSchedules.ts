import { useQuery } from "react-query";

import type { ScheduleSimpleResponse } from "../types";

import { axios } from "@/lib/axios";

export const getSchedules = (): Promise<ScheduleSimpleResponse[]> => {
  return axios.get(`/schedules`);
};

export const useSchedulesData = () => {
  const { data = [] } = useQuery(["schedules"], getSchedules);
  return { data };
};
