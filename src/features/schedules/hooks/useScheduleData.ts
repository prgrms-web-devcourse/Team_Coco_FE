import { useToast } from "@chakra-ui/react";
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
  const { data = [] as ScheduleSimpleResponse[], ...rest } = useQuery(
    ["schedules"],
    getSchedules,
    {
      select: (data) => [...data].reverse(),
    }
  );

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
    ["schedule", scheduleId],
    () => getSchedule({ scheduleId })
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
  const toast = useToast();

  return useMutation(deleteSchedule, {
    onMutate: async ({ scheduleId }) => {
      await queryClient.cancelQueries(["schedules"]);

      const previousSchedules = queryClient.getQueryData<
        ScheduleDetailResponse[]
      >(["schedules"]);

      if (previousSchedules) {
        queryClient.setQueryData(
          ["schedules"],
          previousSchedules.filter((schedule) => schedule.id !== scheduleId)
        );
      }

      return { previousSchedules };
    },

    onSettled: (data, error, { scheduleId }) => {
      queryClient.invalidateQueries("schedules", { exact: true });
      toast({
        title: "플랜을 삭제하였습니다.",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      navigate(`/schedules`, { replace: true });
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
  const toast = useToast();

  return useMutation(createSchedule, {
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries(["schedules"]);
      const previousSchedules = queryClient.getQueryData<
        ScheduleSimpleResponse[]
      >(["schedules"]);

      if (previousSchedules) {
        queryClient.setQueriesData(
          ["schedules"],
          [...previousSchedules, { ...data, isLoading: true }]
        );
      }
      return { previousSchedules };
    },

    onError: (error, _, context: any) => {
      if (context?.previousSchedule) {
        queryClient.setQueryData<ScheduleSimpleResponse[]>(
          ["schedules"],
          context.previousSchedules
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["schedules"]);
      toast({
        title: "새 플랜을 생성하였습니다.",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
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
  const toast = useToast();

  return useMutation(addMember, {
    onMutate: async ({ scheduleId, data }) => {
      await queryClient.cancelQueries(["schedule", scheduleId]);
      const previousSchedule = queryClient.getQueryData<ScheduleDetailResponse>(
        ["schedule", scheduleId]
      );

      if (previousSchedule) {
        queryClient.setQueriesData(["schedule", scheduleId], {
          ...previousSchedule,
          memberSimpleResponses: [
            ...previousSchedule.memberSimpleResponses,
            { id: data.friendId },
          ],
        });
      }
      return { previousSchedule };
    },

    onError: (error, _, context: any) => {
      if (context?.previousSchedule) {
        queryClient.setQueryData<ScheduleDetailResponse>(
          ["schedule", context.previousSchedule.id],
          context.previousSchedule
        );
      }
    },

    onSettled: (_, error, { scheduleId }) => {
      toast({
        title: "친구를 초대하였습니다.",
        status: "success",
        variant: "subtle",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["schedule", scheduleId]);
    },
  });
};
