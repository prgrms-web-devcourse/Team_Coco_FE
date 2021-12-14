import { useQuery } from "react-query";

import { ChecklistResponse } from "./../types/index";

import { axios } from "@/lib/axios";

export type GetChecklistsDTO = {
  scheduleId: number;
};

export const getChecklists = ({
  scheduleId,
}: GetChecklistsDTO): Promise<ChecklistResponse[]> => {
  return axios.get(`/schedules/${scheduleId}/checklists`);
};

export type UseChecklistsProps = GetChecklistsDTO;

export const useChecklistsData = ({ scheduleId }: UseChecklistsProps) => {
  const { data = [] } = useQuery(["schedules", scheduleId, "checklists"], () =>
    getChecklists({ scheduleId })
  );
  return { data };
};
