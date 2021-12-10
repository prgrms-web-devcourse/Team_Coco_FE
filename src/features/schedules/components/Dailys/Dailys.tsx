import React from "react";

import { Daily } from "../Daily";

type DailysProps = {
  totalDays: number;
  selectedDateIdx: number;
  setSelectedDateIdx: any;
  dailyPlaces: any;
};

export const Dailys = ({
  totalDays,
  selectedDateIdx,
  setSelectedDateIdx,
  dailyPlaces,
}: DailysProps) => {
  return (
    <>
      {Array.from({ length: totalDays }, (_, idx) => idx).map((i) => (
        <Daily
          key={i}
          idx={i}
          focus={selectedDateIdx === i ? true : false}
          dailyPlaces={dailyPlaces}
          onClick={setSelectedDateIdx}
        />
      ))}
    </>
  );
};
