import React from "react";
import { Navigate, Route } from "react-router-dom";

import { MemoPage, MemoUpdatePage } from "@/pages";
import { PrivateRoutes } from "@/routes";

export const MemoRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<Navigate to="/" />} />
      <Route path=":memoId" element={<MemoPage />} />
      <Route path="update" element={<MemoUpdatePage />} />
      <Route path="update/:memoId" element={<MemoUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
