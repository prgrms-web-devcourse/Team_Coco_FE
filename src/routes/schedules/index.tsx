import React from "react";
import { Navigate, Route } from "react-router-dom";

import { SchedulesPage, SchedulePage, ScheduleUpdatePage } from "@/pages";
import { PrivateRoutes } from "@/routes";

export const SchedulesRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<SchedulesPage />} />
      <Route path=":scheduleId" element={<SchedulePage />} />
      <Route path="update" element={<ScheduleUpdatePage />} />
      <Route path="update/:scheduleId" element={<ScheduleUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
