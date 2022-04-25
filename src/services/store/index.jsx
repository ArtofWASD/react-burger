import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data";
import authSlice from "../reducers/auth"
import resetSlice from "../reducers/reset"
import registerSlice from "../reducers/register"



export const store = configureStore({
  reducer: {
    getData: dataSlice,
    authData:authSlice,
    resetData: resetSlice,
    registerData: registerSlice
  },
});
