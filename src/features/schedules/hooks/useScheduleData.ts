import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  ScheduleSimpleResponse,
  ScheduleModificationRequest,
  ScheduleCreationRequest,
} from "../types";

import { axios } from "@/lib/axios";

export const getSchedules = (): Promise<ScheduleSimpleResponse[]> => {
  return axios.get(`/schedules`);
};

export const useSchedulesData = () => {
  const { data = [], ...rest } = useQuery(["schedules"], getSchedules);
  return { data, ...rest };
};

export type GetScheduleDTO = {
  scheduleId: number;
};

export const getSchedule = ({
  scheduleId,
}: GetScheduleDTO): Promise<ScheduleSimpleResponse[]> => {
  return axios.get(`/schedules/${scheduleId}`);
};

export type UseScheduleDataProps = GetScheduleDTO;

export const useScheduleData = ({ scheduleId }: UseScheduleDataProps) => {
  const { data = [], ...rest } = useQuery(["schedules", scheduleId], () =>
    getSchedule({ scheduleId })
  );

  return { data, ...rest };
};

export type ModifyScheduleDTO = {
  data: ScheduleModificationRequest;
  scheduleId: number;
};

export const modifySchedule = ({
  data,
  scheduleId,
}: ModifyScheduleDTO): Promise<number> => {
  return axios.put(`/schedules/${scheduleId}`, data);
};

export const useModifyScheduleData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(modifySchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
      navigate(`/schedules`);
    },
  });
};

export type DeleteScheduleDTO = {
  scheduleId: number;
};

export const deleteSchedule = ({
  scheduleId,
}: DeleteScheduleDTO): Promise<void> => {
  return axios.delete(`/schedules/${scheduleId}`);
};

export const useDeleteScheduleData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(deleteSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
      navigate(`/schedules`);
    },
  });
};

export type CreateScheduleDTO = {
  data: ScheduleCreationRequest;
};

export const createSchedule = ({
  data,
}: CreateScheduleDTO): Promise<number> => {
  return axios.post(`/schedules`, data);
};

export const useCreateScheduleData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(createSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
      navigate(`/schedules`);
    },
  });
};
