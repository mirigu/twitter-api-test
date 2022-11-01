import { createSlice, AnyAction } from "@reduxjs/toolkit";
import { getToken } from "./action";

export interface ITwitterState {
  loading: boolean;
  success: boolean;
  error: boolean;
  errorMsg: string;
}

const initialState = {
  loading: false,
  success: false,
  error: false,
  errorMsg: "",
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
