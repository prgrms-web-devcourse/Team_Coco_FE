import { Fragment } from "react";

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
  const dailyList = [];

  for (let i = 0; i < totalDays; i++) {
    dailyList.push(
      <Daily
        key={i}
        idx={i}
        focus={selectedDateIdx === i ? true : false}
        dailyPlaces={dailyPlaces}
        onClick={setSelectedDateIdx}
      />
    );
  }

  return <Fragment>{dailyList}</Fragment>;
};
