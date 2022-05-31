
import { checkResponse, getCookie } from "../../utils/handler-functions";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wsApi = createApi({
  reducerPath: "ordersAll",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getOrdersAll: build.query<any, void>({
      queryFn: () => ({ data: { orders: [], total: 0, totalToday: 0 } }),
      async onCacheEntryAdded(_arg, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders/all`);
        try {
          await updateCachedData;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          };
          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close()
      },
    }),
    getUserOrders: build.query<any, void>({
      queryFn: () => ({ data: { orders: [], total: 0, totalToday: 0 } }),
      async onCacheEntryAdded(_arg, { updateCachedData, cacheEntryRemoved }) {
        const accessToken = getCookie('token');
        console.log(accessToken);
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
        try {
          await updateCachedData;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          };
          ws.addEventListener("message", listener);
        } catch {}
        await cacheEntryRemoved;
        ws.close()
      },
    }),
  }),
});
export const { useGetOrdersAllQuery, useGetUserOrdersQuery } = wsApi;
