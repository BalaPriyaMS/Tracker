import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { AuthLayout } from "./app/layouts/auth-layout";
import { TrackLayout } from "./app/layouts/track-layout";
import { LoginPage } from "./modules/auth/login-page";
import { RegisterPage } from "./modules/auth/register-page";
import { Tracker } from "./modules/trak/traker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TrackLayout />,
    children: [{ path: "/", element: <Tracker /> }],
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
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
