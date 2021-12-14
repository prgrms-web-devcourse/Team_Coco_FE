import { rest } from "msw";

import { API_URL } from "@/config";
export const getSchedules = rest.get(`${API_URL}/schedules`, (req, res, ctx) =>
  res(ctx.json(["스케줄이다"]))
);
