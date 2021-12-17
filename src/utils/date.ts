import { differenceInDays, isEqual, addMinutes } from "date-fns";

export const getTotalDays = (endDate: Date, startDate: Date) => {
  const correction = !isEqual(endDate, startDate) ? 2 : 1;
  return differenceInDays(endDate, addMinutes(startDate, 1)) + correction;
};
