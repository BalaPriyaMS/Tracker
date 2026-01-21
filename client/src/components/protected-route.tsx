import { useAppSelector } from "@/app/store/hook";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const location = useLocation();

  if (!userInfo) {
    return <Navigate to="auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
