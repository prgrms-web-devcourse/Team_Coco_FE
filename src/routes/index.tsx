import { Spinner, Center } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { PostsPage } = lazyImport(() => import("@/pages/posts"), "PostsPage");

const { ProfilePage } = lazyImport(
  () => import("@/pages/profile"),
  "ProfilePage"
);
const { SchedulesPage } = lazyImport(
  () => import("@/pages/schedules"),
  "SchedulesPage"
);

const { LandingPage } = lazyImport(() => import("@/pages/auth"), "LandingPage");

const App = () => {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <Center w="100%" h="100vh">
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
        <Route path="posts" element={<PostsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="schedule" element={<SchedulesPage />} />
      </Route>
    </Routes>
  );
};
