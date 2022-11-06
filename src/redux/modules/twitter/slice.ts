import { createSlice, AnyAction } from "@reduxjs/toolkit";
import {
  followMe,
  getTargetInfo,
  getToken,
  getUserInfo,
  postLike,
  postRetweet,
} from "./action";
// types
import type { IUserData } from "../../../lib/types/user";

export interface ITwitterState {
  loading: boolean;
  success: boolean;
  error: boolean;
  errorMsg: string;
  user: IUserData | undefined;
  target: IUserData | undefined;
  following: boolean;
  liked: boolean;
  retweeted: boolean;
}

const initialState = {
  loading: false,
  success: false,
  error: false,
  errorMsg: "",
  user: undefined,
  target: undefined,
  following: false,
  liked: false,
  retweeted: false,
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
      .addCase(getTargetInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getTargetInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.target = action.payload.target;
      })
      .addCase(followMe.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(followMe.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.following = action.payload.following;
        state.error = false;
      })
      .addCase(postLike.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(postLike.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.liked = action.payload.liked;
        state.error = false;
      })
      .addCase(postRetweet.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(postRetweet.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.retweeted = action.payload.retweeted;
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
