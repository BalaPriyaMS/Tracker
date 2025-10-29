import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex size-full">
      <div className="size-full">
        <Outlet />
      </div>
    </div>
  );
};
