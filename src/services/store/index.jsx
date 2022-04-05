import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data";

export const store = configureStore({
  reducer: {
    getData: dataSlice
  },
});
