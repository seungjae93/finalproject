import React from "react";
import Router from "./shared/Router";
import RouteChangeTracker from "./components/RouteChangeTracker/RouteChangeTracker";
import GlobalStyle from "./components/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: true } },
});

const App = () => {
  RouteChangeTracker();
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
