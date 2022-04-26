import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data";
import resetSlice from "../reducers/reset"
import authSlice from "../reducers/auth"

export const store = configureStore({
  reducer: {
    getData: dataSlice,
    resetData: resetSlice,
    authData: authSlice
  },
});
