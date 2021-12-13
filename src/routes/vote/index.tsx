import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { VotePage, VoteUpdatePage } from "@/pages";

export const VoteRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/" />} />
      <Route path=":voteId" element={<VotePage />} />
      <Route path="update" element={<VoteUpdatePage />} />
      <Route path="update/:voteId" element={<VoteUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
