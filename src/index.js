import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

axios.defaults.withCredentials = true;
if (process.env.NODE_ENV !== "production") {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.group("[API ERROR]");
      console.log("URL:", error.config?.url);
      console.log("Method:", error.config?.method?.toUpperCase());
      console.log("Status:", error.response?.status);
      console.log(
        "Message:",
        error.response?.data?.message || error.message || "Unknown error"
      );
      console.log("Response:", error.response?.data);
      console.groupEnd();
      return Promise.reject(error);
    }
  );
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
