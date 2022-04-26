import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const postRegisterForm = createAsyncThunk("data/postRegisterForm", async (form, { rejectWithValue }) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  })
  .then((response) => response.json())
  .then((data)=>{
      if (data.success) {
          return data
      };
  })
  .catch((error) => rejectWithValue(error.message));
});

export const postLogIn = createAsyncThunk("data/postLogIn", async (form, { rejectWithValue })=>{
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json;charset=utf-8",
      "authorization": "Bearer "
    },
    body: JSON.stringify(form)
  })
  .then(response => response.json())
  .then((data)=>{
    if (data.success) {
      return data
    }
  })
  .catch((error) => rejectWithValue(error.message));
})
export const authSlice = createSlice({
  name: "auth",
  initialState: {
      registerData:null,
      logInData:{
        success:false
      }
  },
  reducers: {},
  extraReducers: {
    [postRegisterForm.fulfilled]: (state, action) => {
        state.registerData = action.payload;
    },
    [postLogIn.fulfilled]: (state, action) => {
      state.logInData = action.payload;
  },

  },
});

export default authSlice.reducer;
