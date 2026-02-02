import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  currencyCode: string;
  locale: string;
}

const initialState: AppState = {
  currencyCode: "USD",
  locale: "en-US",
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default app.reducer;
