import { configureStore } from "@reduxjs/toolkit";
import getDataSlice from "../reducers/get-data";

export const store = configureStore({
  reducer: {
    getData: getDataSlice,
  },
});
