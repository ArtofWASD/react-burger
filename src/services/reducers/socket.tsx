import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkResponse, getCookie } from "../../utils/handler-functions";
import { API_URL } from "../../utils/api-constant";

export const fetchFeed = createAsyncThunk("socket/fetchFeed", async (_, { rejectWithValue }) => {
    return fetch(`${API_URL}/orders/feed`)
      .then(checkResponse)
      .then((data) => {
        if (data.success) {
          return data.data;
        }
        throw new Error("Данные не поступили");
      })
      .catch((error) => rejectWithValue(error.message));
  });

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
      orders:{}
  },
  reducers: {
    wsOn(state) {
      const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all");
      ws.onmessage = (event:MessageEvent) =>{
        const data = JSON.parse(event.data);
        if (data) {
          state.orders = data
        }
      }
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
  }
});
export const { wsOn } = socketSlice.actions;
export default socketSlice.reducer;
