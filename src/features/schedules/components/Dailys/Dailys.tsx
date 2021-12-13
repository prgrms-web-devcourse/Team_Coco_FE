import React from "react";

import { Daily } from "../Daily";

type DailysProps = {
  totalDays: number;
  selectedDateIdx: number;
  setSelectedDateIdx: any;
  dailyPlaces: any;
  className?: string;
};

export const Dailys = ({
  totalDays,
  selectedDateIdx,
  setSelectedDateIdx,
  dailyPlaces,
  className,
}: DailysProps) => {
  return (
    <>
      {Array.from({ length: totalDays }, (_, idx) => idx).map((idx) => (
        <Daily
          key={`Daily-${idx}`}
          idx={idx}
          focus={selectedDateIdx === idx ? true : false}
          dailyPlaces={dailyPlaces}
          onClick={setSelectedDateIdx}
          className={className}
        />
      ))}
    </>
  );
};
