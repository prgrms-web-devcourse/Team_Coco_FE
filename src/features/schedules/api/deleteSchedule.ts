import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { axios } from "@/lib/axios";

export type DeleteScheduleDTO = {
  scheduleId: number;
};

export const deleteSchedule = ({
  scheduleId,
}: DeleteScheduleDTO): Promise<void> => {
  return axios.delete(`/schedules/${scheduleId}`);
};

export const useDeleteSchedule = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(deleteSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
      navigate(`/schedules`);
    },
  });
};
