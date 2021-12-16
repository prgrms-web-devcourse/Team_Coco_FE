import React from "react";
import { Navigate, Route } from "react-router-dom";

import { ProfilePage } from "@/pages";
import { PrivateRoutes } from "@/routes";

export const ProfileRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
