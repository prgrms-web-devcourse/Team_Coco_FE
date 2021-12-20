import { Center } from "@chakra-ui/react";
import { createBrowserHistory, BrowserHistory } from "history";
import React, {
  Suspense,
  useState,
  useLayoutEffect,
  PropsWithChildren,
} from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Router, Routes, Route, RoutesProps } from "react-router-dom";

import { CustomSpinner } from "@/components/CustomSpinner";
import { AppLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImport";
import { storage } from "@/utils/storage";

const { ProfileRoutes } = lazyImport(
  () => import("@/routes/profile"),
  "ProfileRoutes"
);

const { PostsRoutes } = lazyImport(
  () => import("@/routes/posts"),
  "PostsRoutes"
);

const { SchedulesRoutes } = lazyImport(
  () => import("@/routes/schedules"),
  "SchedulesRoutes"
);

const { VoteRoutes } = lazyImport(() => import("@/routes/vote"), "VoteRoutes");

const { MemoRoutes } = lazyImport(() => import("@/routes/memo"), "MemoRoutes");
const { NoteRoutes } = lazyImport(() => import("@/routes/note"), "NoteRoutes");

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
            <CustomSpinner />
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
    <CustomRouter history={history}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile/*" element={<ProfileRoutes />} />
          <Route path="posts/*" element={<PostsRoutes />} />
          <Route path="schedules/*" element={<SchedulesRoutes />} />
          <Route path="note/*" element={<NoteRoutes />} />
          <Route path="vote/*" element={<VoteRoutes />} />
          <Route path="memo/*" element={<MemoRoutes />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
      </Routes>
    </CustomRouter>
  );
};

export const history = createBrowserHistory();

export const CustomRouter = ({
  history,
  children,
}: PropsWithChildren<{ history: BrowserHistory }>) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      location={state.location}
      navigationType={state.action}
      navigator={history}
      children={children}
    />
  );
};

export const PrivateRoutes = ({ children, ...rest }: RoutesProps) => {
  const token = storage.getToken();
  return token ? (
    <Routes {...rest}>{children}</Routes>
  ) : (
    <Navigate to="/login" />
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
