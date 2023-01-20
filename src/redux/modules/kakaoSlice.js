import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setToken from "../../shared/setToken";
import { setCookie } from "../../shared/cookie";

export const __kakaoLogin = createAsyncThunk(
  "__kakaoLogin",
  async (code, thunkAPI) => {
    try {
      setToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_DIRECT}?code=${code}`
      );
      setCookie("token", response.data.accessToken, {
        path: "/",
        expire: "after720m",
      });
      localStorage.setItem("nickname", response.data.nickname);
      console.log(response);
      alert(`${response.data.nickname}님 안녕하세요 :) `);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  login: false,
  isLoading: false,
  error: null,
  errorMessage: "",
  nickname: "",
};

const kakaoSlice = createSlice({
  name: "kakao",
  initialState,
  reducers: {
    loginCheck: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__kakaoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__kakaoLogin.fulfilled, (state) => {
        state.isLoading = true;
        state.login = true;
      })
      .addCase(__kakaoLogin.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { loginCheck } = kakaoSlice.actions;
export default kakaoSlice.reducer;
