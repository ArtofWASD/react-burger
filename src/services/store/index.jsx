import { configureStore } from "@reduxjs/toolkit";
import getDataSlice from "../reducers/get-data";
import postOrderSlice from "../reducers/post-data"

export const store = configureStore({
  reducer: {
    getData: getDataSlice,
    postOrder: postOrderSlice
  },
});
