import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SchedulesPage, SchedulePage, ScheduleUpdatePage } from "@/pages";

export const SchedulesRoutes = () => {
  return (
    <Routes>
      <Route index element={<SchedulesPage />} />
      <Route path=":scheduleId" element={<SchedulePage />} />
      <Route path="update" element={<ScheduleUpdatePage />} />
      <Route path="update/:scheduleId" element={<ScheduleUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
