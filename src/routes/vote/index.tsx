import React from "react";
import { Navigate, Route } from "react-router-dom";

import { VotePage, VoteUpdatePage } from "@/pages";
import { PrivateRoutes } from "@/routes";

export const VoteRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<Navigate to="/" />} />
      <Route path=":voteId" element={<VotePage />} />
      <Route path="update" element={<VoteUpdatePage />} />
      <Route path="update/:voteId" element={<VoteUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
