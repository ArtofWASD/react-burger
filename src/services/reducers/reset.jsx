import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";
import { checkResponse} from '../../utils/handler-functions'

export const postResetForm = createAsyncThunk("data/postResetForm", async (form) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  })
  .then(checkResponse)
});

export const postResetPassword =createAsyncThunk("data/postResetPassword", async (form) =>{
  return fetch(`${API_URL}/password-reset/reset`,{
    method: 'POST',
    headers: {"Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form)
  }).then(checkResponse)
})

export const resetSlice = createSlice({
  name: "reset",
  initialState: {
    status:false,
  },
  reducers: {
  },
  extraReducers: {
    [postResetForm.fulfilled]: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default resetSlice.reducer;
