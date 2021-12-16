import React from "react";
import { Navigate, Route } from "react-router-dom";

import { PostsPage, PostPage, PostUpdatePage } from "@/pages";
import { PrivateRoutes } from "@/routes";

export const PostsRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<PostsPage />} />
      <Route path=":postId" element={<PostPage />} />
      <Route path="update" element={<PostUpdatePage />} />
      <Route path="update/:postId" element={<PostUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
