import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const postOrder = createAsyncThunk("ingridients/fetchData", async (order,{rejectWithValue}) => {
    return fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(order),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Не пришёл ответ от сервера");
        })
        .then((result) => {
          if (result.success) {
            return result.order.number;
          }
          throw new Error("Не пришёл номер заказа");
        })
        .catch((error) => rejectWithValue(error.message))
   });

export const postOrderSlice = createSlice({
    name: "orders",
    initialState: {
      orders: [],
      status: null,
      error: null,
    },
    extraReducers: {
        [postOrder.pending]: (state) => {
          state.error = null;
          state.status = "Loading";
        },
        [postOrder.fulfilled]: (state, action) => {
          state.status = "resolved";
          state.ingridients = action.payload
        },
        [postOrder.rejected]: (state, action) => {
          state.status = "False";
          state.error = action.payload
        },
      },
})
export default postOrderSlice.reducer