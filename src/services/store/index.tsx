import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data";
import resetSlice from "../reducers/reset";
import authSlice from "../reducers/auth";
import loginSlice from "../reducers/login";
import userInfoSlice from "../reducers/userInfo";
import { wsApi } from "../reducers/socket";

const store = configureStore({
  reducer: {
    getData: dataSlice,
    resetData: resetSlice,
    authData: authSlice,
    loginData: loginSlice,
    userData: userInfoSlice,
    [wsApi.reducerPath]:wsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsApi.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
