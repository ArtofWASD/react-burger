import React from "react";
import ReactDOM from "react-dom";
import { store } from "./services/store";
import { Provider } from "react-redux";
import App from "./components/app/app";
import "./index.css";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
