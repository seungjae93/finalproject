import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../shared/cookie";

export const __kakaoLogin = createAsyncThunk(
  "__kakaoLogin",
  async (code, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_DIRECT}?code=${code}`,
        {
          withCredentials: true,
        }
      );
      setCookie("token", response.data.accessToken, {
        path: "/",
      });
      const email = response.data.email;
      const nickEmail = email.substring(0, email.indexOf("@"));
      localStorage.setItem("email", nickEmail);
      alert(`${nickEmail}님 안녕하세요 :) `);
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
      .addCase(__kakaoLogin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { loginCheck } = kakaoSlice.actions;
export default kakaoSlice.reducer;
