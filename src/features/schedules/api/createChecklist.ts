import { useQueryClient, useMutation } from "react-query";

import type { ChecklistCreationRequest } from "../types";

import { axios } from "@/lib/axios";

export type CreateChecklistDTO = {
  scheduleId: number;
  data: ChecklistCreationRequest;
};

export const createChecklist = ({
  scheduleId,
  data,
}: CreateChecklistDTO): Promise<number> => {
  return axios.post(`/schedules/${scheduleId}/checklists`, data);
};

export const useCreateChecklists = () => {
  const queryClient = useQueryClient();

  return useMutation(createChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["checklists"]);
    },
  });
};
