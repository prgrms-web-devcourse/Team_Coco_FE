import { Spinner, Center } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { ProfilePage } = lazyImport(
  () => import("@/pages/profile"),
  "ProfilePage"
);

const { PostsRoutes } = lazyImport(
  () => import("@/routes/posts"),
  "PostsRoutes"
);

const { SchedulesRoutes } = lazyImport(
  () => import("@/routes/schedules"),
  "SchedulesRoutes"
);

const { LandingPage } = lazyImport(() => import("@/pages/auth"), "LandingPage");

const { LoginPage } = lazyImport(() => import("@/pages/auth"), "LoginPage");

const { RegisterPage } = lazyImport(
  () => import("@/pages/auth"),
  "RegisterPage"
);

const App = () => {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <Center h="100vh">
            <Spinner />
          </Center>
        }
      >
        <Outlet />
      </Suspense>
    </AppLayout>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="posts/*" element={<PostsRoutes />} />
        <Route path="schedules/*" element={<SchedulesRoutes />} />
        <Route path="*" element={<Navigate to="." />} />
      </Route>
    </Routes>
  );
};
