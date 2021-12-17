import { differenceInDays, isEqual, addMinutes, format } from "date-fns";
import { ko } from "date-fns/locale";

export const getTotalDays = (endDate: Date, startDate: Date) => {
  const correction = !isEqual(endDate, startDate) ? 2 : 1;
  return differenceInDays(endDate, addMinutes(startDate, 1)) + correction;
};

export const formatCreatedAt = (createdAt: string) => {
  return format(new Date(createdAt), "PP E p", { locale: ko });
};
