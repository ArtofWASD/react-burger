import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkResponse, getCookie } from "../../utils/handler-functions";
import { API_URL } from "../../utils/api-constant";


export const fetchFeed = createAsyncThunk("socket/fetchFeed", async () => {
  const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
  ws.onmessage = (event: MessageEvent) => {
    let data = JSON.parse(event.data)
  };
});

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    orders:[] as any
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action:any) => {      
      state = action.payload;
    });
  },
});

export default socketSlice.reducer;
