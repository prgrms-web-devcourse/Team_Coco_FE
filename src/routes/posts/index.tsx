import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { PostsPage, PostPage } from "@/pages";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route index element={<PostsPage />} />
      <Route path=":postId" element={<PostPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
