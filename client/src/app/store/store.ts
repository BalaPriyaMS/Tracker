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

import userReducer, { type UserState } from "@/features/user-slice";
import { combineReducers, configureStore, type Action } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";

const userPersistConfig = { key: "user", storage };

const staticReducers = {
  user: persistReducer<UserState>(userPersistConfig, userReducer),
};

const rootReducer = combineReducers(staticReducers);

const reducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: Action,
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
