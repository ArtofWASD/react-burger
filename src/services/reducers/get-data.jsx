import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    return fetch(`${API_URL}/ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Не пришёл ответ от сервера");
      })
      .then((data) => {
        if (data.success) {
          return data.data;
        }
        throw new Error("Данные не поступили");
      })
      .catch((error) => rejectWithValue(error.message));
  }
);

export const postOrder = createAsyncThunk(
  "data/postOrder",
  async (order, { rejectWithValue }) => {
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
          return result.order;
        }
        throw new Error("Не пришёл номер заказа");
      })
      .catch((error) => rejectWithValue(error.message));
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    ingridients: [],
    ingridientItem: {},
    order: {
      number: "",
    },
    constructor: {
      ingridients: [],
      buns: [],
    },
    status: null,
    error: null,
    total: 0,
  },
  reducers: {
    reset(state) {
      state.order.number = "";
      state.ingridientItem = "";
    },
    getIngridientItem(state, action) {
      state.ingridientItem = action.payload;
    },
    deleteIngridientItem(state, action) {
      console.log("deleted");
      let { inputIndex } = action.payload;
      state.constructor.ingridients.splice(inputIndex, 1);
    },
    addIngridientItem(state, action) {
      state.constructor.ingridients.push(action.payload);
      const ingridients = state.constructor.ingridients.reduce((summ, current) => 
      summ + current.price, state.constructor.buns.reduce((summ, current) => summ + current.price*2, 0)
    );
    state.total = ingridients
    },
    addBunItem(state, action) {
      if (state.constructor.buns.length < 1) {
        state.constructor.buns.push(action.payload);
        const bunSumm = state.constructor.buns.reduce((summ, current) => summ + current.price*2, 0)
        state.total = bunSumm
      } else {
        return;
      }
    },
    totalOrderPrice(state) {
    },
    updateIngridient(state, action){
      console.log('update');
    }
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.error = null;
      state.status = "Loading";
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.ingridients = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "False";
      state.error = action.payload;
    },
    [postOrder.pending]: (state) => {
      state.error = null;
      state.status = "Loading";
    },
    [postOrder.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.order = action.payload;
    },
    [postOrder.rejected]: (state, action) => {
      state.status = "False";
      state.error = action.payload;
    },
  },
});

export const {
  reset,
  getIngridientItem,
  deleteIngridientItem,
  addIngridientItem,
  setModalActive,
  addBunItem,
} = dataSlice.actions;

export default dataSlice.reducer;
