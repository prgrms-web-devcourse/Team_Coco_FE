import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SchedulesPage, SchedulePage } from "@/pages";

export const SchedulesRoutes = () => {
  return (
    <Routes>
      <Route index element={<SchedulesPage />} />
      <Route path=":scheduleId" element={<SchedulePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
