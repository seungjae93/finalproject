import { configureStore } from "@reduxjs/toolkit";
import kakaoSlice from "../modules/kakaoSlice";

const store = configureStore({ reducer: { kakaoSlice } });
export default store;
