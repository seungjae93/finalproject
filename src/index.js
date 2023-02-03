import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import "./fonts/Font.css";

if (process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
