import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../api/instance";

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
      const token = response.data.accessToken;
      const email = response.data.email;
      const nickEmail = email.substring(0, email.indexOf("@"));
      localStorage.setItem("email", nickEmail);
      localStorage.setItem("token", token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// mutate 를 이용
export const __kakaoLogout = async () => {
  const response = await instance.post("/auth/logout");
  return response.data;
};

const initialState = {
  login: false,
  error: null,
};

const kakaoSlice = createSlice({
  name: "kakao",
  initialState,
  reducers: {},
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

export default kakaoSlice.reducer;
