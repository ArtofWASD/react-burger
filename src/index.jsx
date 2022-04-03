import React from "react";
import ReactDOM from "react-dom";
import { store } from "./services/store/store";
import { Provider } from "react-redux";
import "./index.css";

import App from "./components/app/app";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
