import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TrackLayout } from "./app/layouts/track-layout";
import { Tracker } from "./modules/trak/traker";
import { AuthLayout } from "./app/layouts/auth-layout";
import { LoginPage } from "./modules/auth/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TrackLayout />,
    children: [{ path: "/", element: <Tracker /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
