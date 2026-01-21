import { Toaster } from "@/components/ui/sonner";

import AppRouter from "../router";
import { AppProvider } from "./provider";

export const App = () => (
  <AppProvider>
    <AppRouter />
    <Toaster />
  </AppProvider>
);
