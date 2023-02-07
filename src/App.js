import React from "react";
import Router from "./shared/Router";
import GlobalStyle from "./components/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
