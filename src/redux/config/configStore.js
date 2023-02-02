import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/kakaoSlice";

const store = configureStore({ reducer: { user } });
export default store;
