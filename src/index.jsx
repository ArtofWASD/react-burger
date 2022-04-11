import React from "react";
import ReactDOM from "react-dom";
import { store } from "./services/store";
import { Provider } from "react-redux";
import "./index.css";

import App from "./components/app/app";

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
    </React.StrictMode>,
  document.getElementById("root")
);
