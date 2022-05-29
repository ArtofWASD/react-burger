import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data";
import resetSlice from "../reducers/reset";
import authSlice from "../reducers/auth";
import loginSlice from "../reducers/login";
import userInfoSlice from "../reducers/userInfo";
import socketSlice from '../reducers/socket'

const store = configureStore({
  reducer: {
    getData: dataSlice,
    resetData: resetSlice,
    authData: authSlice,
    loginData: loginSlice,
    userData: userInfoSlice,
    socketData: socketSlice
    
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
