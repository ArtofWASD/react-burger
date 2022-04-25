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

export const registerSlice = createSlice({
  name: "register",
  initialState: {
      data:null
  },
  reducers: {},
  extraReducers: {
    [postRegisterForm.fulfilled]: (state, action) => {
        state.data = action.payload;
    },
  },
});

export default registerSlice.reducer;
