import { configureStore } from "@reduxjs/toolkit";
import kakaoSlice from "../modules/kakaoSlice";
import communitySlice from "../modules/communitySlice";

const store = configureStore({ reducer: { kakaoSlice, communitySlice } });
export default store;
