import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkResponse, getCookie } from "../../utils/handler-functions";

type TToken = {
  token?: string;
}

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    data:{
      orders:[],
      success: false,
      total: 0,
      totalToday : 0,
    }
  },
  reducers: {
    wsInit(_, action:PayloadAction<TToken>){

    },
    wsClose(_, action:PayloadAction<TToken>){
      
    },
    addOrders(state, action:any) {
      state.data = action.payload;
    },
  },
});
export const { addOrders, wsInit, wsClose } = socketSlice.actions;
export default socketSlice.reducer;
