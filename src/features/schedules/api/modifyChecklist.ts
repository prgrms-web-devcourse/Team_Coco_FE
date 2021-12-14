import { useMutation, useQueryClient } from "react-query";

import { axios } from "@/lib/axios";

export type ModifyChecklistDTO = {
  checklistId: number;
  scheduleId: number;
  flag: boolean;
};

export const modifyChecklist = ({
  checklistId,
  scheduleId,
  flag,
}: ModifyChecklistDTO): Promise<void> => {
  return axios.patch(
    `/schedules/${scheduleId}/checklists/${checklistId}?flag=${flag}`
  );
};

export const useModifyChecklist = () => {
  const queryClient = useQueryClient();

  return useMutation(modifyChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["checklists"]);
    },
  });
};
