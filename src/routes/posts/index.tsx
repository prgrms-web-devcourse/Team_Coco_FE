import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { PostsPage, PostPage, PostUpdatePage } from "@/pages";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route index element={<PostsPage />} />
      <Route path=":postId" element={<PostPage />} />
      <Route path="update" element={<PostUpdatePage />} />
      <Route path="update/:postId" element={<PostUpdatePage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
