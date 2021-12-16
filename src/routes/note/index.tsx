import React from "react";
import { Navigate, Route } from "react-router-dom";

import { NotePage } from "@/pages";
import { PrivateRoutes } from "@/routes";

export const NoteRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<NotePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
