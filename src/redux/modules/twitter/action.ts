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
      const response = await instance.post("/callback", { code });
      setCookie("token", response.data.token.access_token);
      setCookie("refresh_token", response.data.token.refresh_token);
    } catch (error) {
      console.log(error);
      return rejectWithValue("데이터를 받아오는데 실패했습니다.");
    }
  }
);
