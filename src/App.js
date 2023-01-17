import React from "react";
import Router from "./shared/Router";
import GlobalStyle from "./components/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getCookie } from "./shared/cookie";
import { loginCheck } from "./redux/modules/kakaoSlice";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const accessToken = getCookie("token");

  if (accessToken) {
    dispatch(loginCheck(true));
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
