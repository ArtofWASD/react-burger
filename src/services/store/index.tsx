import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data-reducer/get-data";
import resetSlice from "../reducers/reset-reducer/reset";
import authSlice from "../reducers/auth-reducer/auth";
import loginSlice from "../reducers/login-reducer/login";
import userInfoSlice from "../reducers/user-info-reducer/user-Info";
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
