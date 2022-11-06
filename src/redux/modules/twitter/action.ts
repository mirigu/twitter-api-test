import { createAsyncThunk } from "@reduxjs/toolkit";
// axios
import { instance } from "../../../api";
// cookie
import { setCookie } from "../../../utils/cookie";

// 토큰 가져오기
export const getToken = createAsyncThunk(
  "twitter/getToken",
  async (code: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await instance.post("/token", { code });
      setCookie("token", response.data.token.access_token);
      setCookie("refresh_token", response.data.token.refresh_token);
    } catch (error) {
      console.log(error);
      return rejectWithValue("데이터를 받아오는데 실패했습니다.");
    }
  }
);

// 사용자 정보 가져오기
export const getUserInfo = createAsyncThunk(
  "twitter/getUserInfo",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await instance.get("/user/info");
      return { user: response.data.user };
    } catch (error) {
      console.log(error);
      return rejectWithValue("데이터를 받아오는데 실패했습니다.");
    }
  }
);

// 트위터 팔로우 대상 정보 가져오기
export const getTargetInfo = createAsyncThunk(
  "twitter/getTargetInfo",
  async (userName: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await instance.post("/target/info", { userName });
      console.log(response);
      return { target: response.data.targetUser };
    } catch (error) {
      console.log(error);
      return rejectWithValue("데이터를 받아오는데 실패했습니다.");
    }
  }
);

// 팔로우 하기
export const followMe = createAsyncThunk(
  "twitter/followMe",
  async (data: object, { dispatch, getState, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await instance.post("/tweets/follow", data);
      console.log(response);
      return { following: response.data.follow.data.following };
    } catch (error) {
      console.log(error);
      return rejectWithValue("해당 사용자를 팔로우 하는데 실패했습니다.");
    }
  }
);

// 게시물 좋아요
export const postLike = createAsyncThunk(
  "twitter/postLike",
  async (data: object, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await instance.post("/tweets/like", data);
      console.log(response);
      return { liked: response.data.like.data.liked };
    } catch (error) {
      console.log(error);
      return rejectWithValue("해당 게시물을 좋아요 하는데 실패했습니다.");
    }
  }
);
