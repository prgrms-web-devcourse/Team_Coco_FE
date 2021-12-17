import React from "react";

import { Daily } from "../Daily";

type DailysProps = {
  totalDays: number;
  dailyPlaces: any;
  selectedDateIdx?: number;
  setSelectedDateIdx?: any;
  className?: string;
  onDelete?: (idx: number) => void;
};

export const Dailys = (props: DailysProps) => {
  const {
    totalDays,
    selectedDateIdx,
    setSelectedDateIdx,
    dailyPlaces,
    className,
    onDelete,
  } = props;
  console.log(dailyPlaces);

  return (
    <>
      {Array.from({ length: totalDays }, (_, idx) => idx).map((idx) => (
        <Daily
          key={`Daily-${idx}`}
          idx={idx}
          focus={selectedDateIdx === idx ? true : false}
          dailyPlacesSummary={dailyPlaces}
          onClick={setSelectedDateIdx}
          className={className}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
