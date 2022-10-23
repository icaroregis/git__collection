import React from "react";
import { GlobalStyle } from "./global-styles/global-styles";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <GlobalStyle></GlobalStyle>
  </>
);
