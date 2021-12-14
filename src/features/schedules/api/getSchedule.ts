import { useQuery } from "react-query";

import type { ScheduleSimpleResponse } from "../types";

import { axios } from "@/lib/axios";

export type GetScheduleDTO = {
  scheduleId: number;
};

export const getSchedule = ({
  scheduleId,
}: GetScheduleDTO): Promise<ScheduleSimpleResponse[]> => {
  return axios.get(`/schedules/${scheduleId}`);
};

export type UseScheduleProps = GetScheduleDTO;

export const useScheduleData = ({ scheduleId }: UseScheduleProps) => {
  const { data = [] } = useQuery(["schedules", scheduleId], () =>
    getSchedule({ scheduleId })
  );

  return { data };
};
