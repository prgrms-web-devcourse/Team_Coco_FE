import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { NotePage } from "@/pages";

export const NoteRoutes = () => {
  return (
    <Routes>
      <Route index element={<NotePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
