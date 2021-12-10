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
  return (
    <Fragment>
      {Array(totalDays)
        .fill(1)
        .map((_, idx) => (
          <Daily
            key={idx}
            idx={idx}
            focus={selectedDateIdx === idx ? true : false}
            dailyPlaces={dailyPlaces}
            onClick={setSelectedDateIdx}
          />
        ))}
    </Fragment>
  );
};
