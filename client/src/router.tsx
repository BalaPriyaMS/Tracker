import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { AuthLayout } from "./app/layouts/auth-layout";
import { TrackLayout } from "./app/layouts/track-layout";
import { ProtectedRoute } from "./components/protected-route";
import { ForgotPassword } from "./modules/auth/route/forgot-password";
import { LoginPage } from "./modules/auth/route/login-page";
import { RegisterPage } from "./modules/auth/route/register-page";
import { GroupDetails } from "./modules/tracker/components/dashboard/group-details";
import { Tracker } from "./modules/tracker/components/tracker";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <TrackLayout />{" "}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Tracker />,
      },
      {
        path: "groups/:groupId",
        element: <GroupDetails />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
