import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MemoPage, MemoUpdatePage } from "@/pages";

export const MemoRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/" />} />
      <Route path=":memoId" element={<MemoPage />} />
      <Route path="update" element={<MemoUpdatePage />} />
      <Route path="update/:memoId" element={<MemoUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
