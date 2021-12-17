import { useQuery, useQueryClient, useMutation } from "react-query";

import type { ChecklistResponse, ChecklistCreationRequest } from "../types";

import { axios } from "@/lib/axios";

export type GetChecklistsDTO = {
  scheduleId: number;
};

export const getChecklists = ({
  scheduleId,
}: GetChecklistsDTO): Promise<ChecklistResponse[]> => {
  return axios
    .get(`/schedules/${scheduleId}/checklists`)
    .then((response) => response.data);
};

export type UseChecklistsDataProps = GetChecklistsDTO;

export const useChecklistsData = ({ scheduleId }: UseChecklistsDataProps) => {
  const { data = [], ...rest } = useQuery(
    ["schedules", scheduleId, "checklists"],
    () => getChecklists({ scheduleId })
  );
  return { data, ...rest };
};

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

export const useCreateChecklistData = () => {
  const queryClient = useQueryClient();

  return useMutation(createChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["checklists"]);
    },
  });
};

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

export const useDeleteChecklistData = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["checklists"]);
    },
  });
};

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

export const useModifyChecklistData = () => {
  const queryClient = useQueryClient();

  return useMutation(modifyChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(["checklists"]);
    },
  });
};
