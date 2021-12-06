import { Spinner, Center } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";

const { ConnectionPage } = lazyImport(
  () => import("@/pages/connection"),
  "ConnectionPage"
);

const { PostsPage } = lazyImport(() => import("@/pages/posts"), "PostsPage");
const { ProfilePage } = lazyImport(
  () => import("@/pages/profile"),
  "ProfilePage"
);
const { SchedulePage } = lazyImport(
  () => import("@/pages/schedule"),
  "SchedulePage"
);

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
        <Route path="posts" element={<PostsPage />} />
        <Route path="connection" element={<ConnectionPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
};
