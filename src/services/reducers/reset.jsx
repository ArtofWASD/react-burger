import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const postResetForm = createAsyncThunk("data/postResetForm", async (form, { rejectWithValue }) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  }).catch((error) => rejectWithValue(error.message));
});

export const postResetPassword =createAsyncThunk("data/postResetPassword", async (form,{rejectWithValue}) =>{
  return fetch(`${API_URL}/password-reset/reset`,{
    method: 'POST',
    headers: {"Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form)
  }).then(response => response.json()).then(data=>console.log(data))
})
export const resetSlice = createSlice({
  name: "reset",
  initialState: {
    status:false,
  },
  reducers: {
  },
  extraReducers: {
    [postResetForm.fulfilled]: (state) => {
        state.status = true;
    },
  },
});

export default resetSlice.reducer;
