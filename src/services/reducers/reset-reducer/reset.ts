import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../utils/api-constant";
import { checkResponse } from "../../../utils/handler-functions";

type TResetForm = {
  email: string;
};

type TPostResetPassword = {
  password: string;
  token: string;
};

export const postResetForm = createAsyncThunk("data/postResetForm", async (form: TResetForm) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  }).then(checkResponse);
});

export const postResetPassword = createAsyncThunk("data/postResetPassword", async (form: TPostResetPassword) => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  }).then(checkResponse);
});

export const resetSlice = createSlice({
  name: "reset",
  initialState: {
    status: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postResetForm.fulfilled, (state, action) => {
      state.status = action.payload;
    });
    builder.addCase(postResetForm.rejected, (state) => {
      state.status = false;
    });
  },
});

export default resetSlice.reducer;
