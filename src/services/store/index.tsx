import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import dataSlice from "../reducers/get-data";
import resetSlice from "../reducers/reset";
import authSlice from "../reducers/auth";
import loginSlice from "../reducers/login";
import userInfoSlice from "../reducers/userInfo";
import socketSlice, { addOrders, wsInit, wsClose } from "../reducers/socket";
import { ListenerAPI, WS_URL } from "../../utils/api-constant";
const socketMiddleware = createListenerMiddleware();
let ws: WebSocket;

socketMiddleware.startListening({
  actionCreator: wsInit,
  effect: async (action: any, ListenerAPI) => {
    if (action.payload.token) {
      ws = new WebSocket(`${WS_URL}/orders?token=${action.payload.token}`);
    } else {
      ws = new WebSocket(`${WS_URL}/orders/all`);
    }

    ws.onopen = () => {
    }

    ws.onmessage = (event: MessageEvent) => {
      const data:any = JSON.parse(event.data)
      ListenerAPI.dispatch(addOrders(data));
    };
    
  },
});

socketMiddleware.stopListening({
  actionCreator: wsClose,
  effect:async(action, ListenerAPI) => {
    ws.onclose = (event:CloseEvent) => {
      console.log('Соединение закрыто не корректно');
    }
  }
})

const store = configureStore({
  reducer: {
    getData: dataSlice,
    resetData: resetSlice,
    authData: authSlice,
    loginData: loginSlice,
    userData: userInfoSlice,
    socketData: socketSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware.middleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
