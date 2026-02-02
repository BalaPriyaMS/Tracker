import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";

import appReducer from "@/features/app-slice";
import userReducer from "@/features/user-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import type { AppState } from "@/features/app-slice";
import type { UserState } from "@/features/user-slice";
import type { Action } from "redux";
const appPersistConfig = { key: "app", storage };
const userPersistConfig = { key: "user", storage };

const staticReducers = {
  app: persistReducer<AppState>(appPersistConfig, appReducer),
  user: persistReducer<UserState>(userPersistConfig, userReducer),
};

const rootReducer = combineReducers(staticReducers);

const reducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: Action
): ReturnType<typeof rootReducer> => {
  // If RESET_STATE is dispatched, return undefined to reset all state
  // This causes all reducers to return their initial state
  if (action.type === "RESET_STATE") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
