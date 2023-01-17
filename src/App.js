import React from "react";
import Router from "./shared/Router";
import GlobalStyle from "./components/styles/GlobalStyle";
import { useDispatch } from "react-redux";
import { getCookie } from "./shared/cookie";
import { loginCheck } from "./redux/modules/kakaoSlice";

function App() {
  const dispatch = useDispatch();
  const accessToken = getCookie("token");

  if (accessToken) {
    dispatch(loginCheck(true));
  }
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
