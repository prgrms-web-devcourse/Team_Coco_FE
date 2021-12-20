import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import type {
  ScheduleSimpleResponse,
  ScheduleModificationRequest,
  ScheduleCreationRequest,
  ScheduleDetailResponse,
} from "../types";

import { axios } from "@/lib/axios";

export const getSchedules = (): Promise<ScheduleSimpleResponse[]> => {
  return axios.get(`/schedules`).then((response) => response.data);
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
}: GetScheduleDTO): Promise<ScheduleDetailResponse> => {
  return axios
    .get(`/schedules/${scheduleId}`)
    .then((response) => response.data);
};

export type UseScheduleDataProps = GetScheduleDTO;

export const useScheduleData = ({ scheduleId }: UseScheduleDataProps) => {
  const { data = {} as ScheduleDetailResponse, ...rest } = useQuery(
    ["schedules", scheduleId],
    () => getSchedule({ scheduleId })
  );

  useQuery(["members", scheduleId], () =>
    getSchedule({ scheduleId }).then((data) => data.memberSimpleResponses)
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
  return axios.post(`/schedules`, data).then((response) => response.data);
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

export type addMemberDTO = {
  scheduleId: number;
  data: { friendId: number };
};

export const addMember = ({
  scheduleId,
  data,
}: addMemberDTO): Promise<number> => {
  return axios.post(`/schedules/${scheduleId}/members`, data);
};

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation(addMember, {
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};
