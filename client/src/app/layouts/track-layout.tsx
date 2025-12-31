import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import EmailInvite from "@/modules/tracker/components/invite";

export const TrackLayout = () => {
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <header className="flex justify-between items-center shadow-sm px-6 py-3 border-b">
        <h1 className="font-semibold text-primary text-lg">Tracker</h1>
        <div className="flex items-center gap-4">
          <EmailInvite />
          <Button>User</Button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
