import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const postResetForm = createAsyncThunk("data/postResetForm", async (form, { rejectWithValue, dispatch }) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data
      }
    })
    .catch((error) => rejectWithValue(error.message));
});

export const resetSlice = createSlice({
  name: "reset",
  initialState: {
    status:null,
  },
  reducers: {
  },
  extraReducers: {
    [postResetForm.fulfilled]: (state) => {
        state.status = "resolved";
    },
  },
});

export default resetSlice.reducer;
