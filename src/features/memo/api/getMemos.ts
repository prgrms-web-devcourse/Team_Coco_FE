import { useQuery } from "react-query";

import { axios } from "@/lib/axios";

export type GetMemosDTO = {
  scheduleId: number;
};

export type UseGetMemosProps = GetMemosDTO;

const getMemos = ({ scheduleId }: GetMemosDTO) => {
  return axios.get(`/schedules/${scheduleId}/memos`);
};

export const useMemosData = ({ scheduleId }: UseGetMemosProps) => {
  const { data = [] } = useQuery(["memos", scheduleId], () =>
    getMemos({ scheduleId })
  );
  return { data };
};
