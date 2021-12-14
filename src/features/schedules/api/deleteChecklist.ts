import { useMutation, useQueryClient } from "react-query";

import { axios } from "@/lib/axios";

export type DeleteChecklistDTO = {
  checklistId: number;
  scheduleId: number;
};

export const deleteChecklist = ({
  checklistId,
  scheduleId,
}: DeleteChecklistDTO): Promise<void> => {
  return axios.delete(`/schedules/${scheduleId}/checklists/${checklistId}`);
};

export const useDeleteChecklist = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["checklists"]);
    },
  });
};
