import type { City } from "../types";

import type { Theme } from "@/features/schedules/types";

export const cities: City[] = ["서울", "부산", "인천", "제주"];

type Themes = Record<Theme, string> & { ALL: "전체" };

export const searchThemes: Themes = {
  ALL: "전체",
  FOOD: "맛집",
  ART: "예술",
  ACTIVITY: "액티비티",
  HISTORY: "역사",
  NATURE: "자연",
};
