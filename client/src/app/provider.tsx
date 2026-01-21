import { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Spinner } from "@/components/ui/spinner";

import { persistor, store } from "./store/store";

type AppProviderProps = {
  children: React.ReactNode;
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-screen h-screen">
    <Spinner />
  </div>
);

export const AppProvider = ({
  children,
}: AppProviderProps): React.ReactElement => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </Suspense>
  );
};
