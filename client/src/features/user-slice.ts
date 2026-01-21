import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userInfo: User | null;
}

const initialState: UserState = { userInfo: null };

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    reset: () => initialState,
  },
});

export const { updateUserInfo } = user.actions;

export default user.reducer;
