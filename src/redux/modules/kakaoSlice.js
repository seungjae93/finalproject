import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { setCookie } from "../../shared/cookie";
// import setToken from "../../shared/setToken";
import { instance } from "../api/axios";

export const __kakaoLogin = createAsyncThunk(
  "__kakaoLogin",
  async (payload, thunkAPI) => {
    try {
      // setToken();
      const { data } = await instance.post("/auth/kakao/callback", payload);
      return thunkAPI.fulfillWithValue(data);
      // setCookie("token", data.token, {
      //   path: "/",
      // });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLogedIn: false,
  isSignUp: false,
  error: false,
  errorMsg: "",
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
      .addCase(__kakaoLogin.fulfilled, (state, action) => {
        state.isLoading = true;
        console.log(action.payload);
      })
      .addCase(__kakaoLogin.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default kakaoSlice.reducer;
