import { createSlice, AnyAction } from "@reduxjs/toolkit";
import { getToken, getUserInfo } from "./action";
// types
import type { IUserData } from "../../../lib/types/user";

export interface ITwitterState {
  loading: boolean;
  success: boolean;
  error: boolean;
  errorMsg: string;
  user: IUserData | undefined;
}

const initialState = {
  loading: false,
  success: false,
  error: false,
  errorMsg: "",
  user: undefined,
} as ITwitterState;

function isRejectAction(action: AnyAction) {
  return action.type.startsWith("twitter") && action.type.endsWith("rejected");
}

export const twitterSlice = createSlice({
  name: "twitter",
  initialState,
  reducers: {
    statusReset: (state) => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload.user;
      })
      .addMatcher(isRejectAction, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addDefaultCase((state) => state),
});

export const { statusReset } = twitterSlice.actions;

export default twitterSlice;
