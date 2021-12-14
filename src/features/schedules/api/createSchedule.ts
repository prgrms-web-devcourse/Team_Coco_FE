import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import type { ScheduleCreationRequest } from "../types";

import { axios } from "@/lib/axios";

export type CreateScheduleDTO = {
  data: ScheduleCreationRequest;
};

export const createSchedule = ({
  data,
}: CreateScheduleDTO): Promise<number> => {
  return axios.post(`/schedules`, data);
};

export const useCreateSchedule = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
      navigate(`/schedules`);
    },
  });
};
