import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../utils/api-constant";
import { checkResponse, getCookie } from "../../../utils/handler-functions";

type TCounter = {
  _id: string;
  count: number;
};

type TIngridients = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
  _uniqueId?: string;
};

type TConstructorItem = {
  _id: string;
  id: string;
  _uniqueId: string;
  type: string;
  name: string;
  image: string;
  price: number;
  index: number;
  moveCard: () => void;
};

type TOrderIngridients = {
  _id: string;
};

export const initialState = {
  ingridients: [] as Array<TIngridients>,
  ingridientItem: {},
  order: {
    number: "",
  },
  constructor: {
    ingridients: [] as Array<TConstructorItem>,
    buns: [] as Array<TConstructorItem>,
  },
  orderIngridients: [] as Array<TOrderIngridients>,
  counter: [] as Array<TCounter>,
  status: "",
  total: 0,
  ingridientModalTitle: "Детали ингридиента",
  userOrder: {
    statusOrder: false,
    _id: "",
    ingredients: [],
    status: "",
    number: 0,
    name: "",
    createdAt: "",
  },
};

export const fetchData = createAsyncThunk("data/fetchData", async (_, { rejectWithValue }) => {
  return fetch(`${API_URL}/ingredients`)
    .then(checkResponse)
    .then((data) => {
      if (data.success) {
        return data.data;
      }
      throw new Error("Данные не поступили");
    })
    .catch((error) => rejectWithValue(error.message));
});

export const postOrder = createAsyncThunk("data/postOrder", async (order: any, { rejectWithValue, dispatch }) => {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(order),
  })
    .then(checkResponse)
    .then((result) => {
      if (result.success) {
        dispatch(dataSlice.actions.resetConstructor());
        return result.order;
      }
      throw new Error("Не пришёл номер заказа");
    })
    .catch((error) => rejectWithValue(error.message));
});

export const getOrderByNumber = createAsyncThunk("data/getOrderByNumber", async (number: number) => {
  return fetch(`https://norma.nomoreparties.space/api/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data.success) {
        return data.orders[0];
      }
    });
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    reset(state) {
      state.order.number = "";
      state.ingridientItem = {};
    },
    resetConstructor(state) {
      state.constructor.ingridients = [];
      state.constructor.buns = [];
      state.orderIngridients = [];
      state.total = 0;
      state.counter = [];
    },
    getIngridientItem(state, action) {
      state.ingridientItem = action.payload;
    },
    deleteIngridientItem(state, action) {
      let { inputIndex } = action.payload;
      state.constructor.ingridients.splice(inputIndex, 1);
      state.orderIngridients.splice(inputIndex, 1);
      state.total = state.constructor.ingridients.reduce(
        (summ, current: any) => summ + current.price,
        state.constructor.buns.reduce((summ, current: any) => summ + current.price * 2, 0)
      );
      const counterItem: any = state.counter.findIndex((item: any) => item._id === action.payload._id);
      if (counterItem !== -1) {
        state.counter[counterItem].count = state.counter[counterItem].count - 1;
      }
    },
    addIngridientItem(state, action) {
      state.constructor.ingridients.push(action.payload);
      state.orderIngridients.push(action.payload._id);
      state.total = state.constructor.ingridients.reduce(
        (summ, current) => summ + current.price,
        state.constructor.buns.reduce((summ, current) => summ + current.price * 2, 0)
      );
      const counterItem = state.counter.findIndex((item) => item._id === action.payload._id);
      if (counterItem !== -1) {
        state.counter[counterItem].count = state.counter[counterItem].count + 1;
      } else {
        state.counter.push({
          _id: action.payload._id,
          count: 1,
        });
      }
    },
    addBunItem(state, action) {
      if (state.constructor.buns.length < 1) {
        state.constructor.buns.push(action.payload);
        state.orderIngridients.push(action.payload._id);
        state.total = state.constructor.buns.reduce((summ, current) => summ + current.price * 2, 0);
        state.counter.push({
          _id: action.payload._id,
          count: 1,
        });
      } else {
        state.constructor.buns.splice(0, 1);
        state.constructor.buns.push(action.payload);
        state.total = state.constructor.ingridients.reduce(
          (summ, current) => summ + current.price,
          state.constructor.buns.reduce((summ, current) => summ + current.price * 2, 0)
        );
        let { inputIndex } = action.payload;
        state.counter.splice(inputIndex, 1);
        state.counter.push({
          _id: action.payload._id,
          count: 1,
        });
      }
    },
    updateIngridient(state, action) {
      state.constructor.ingridients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "resolved";
      state.ingridients = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.status = "false";
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.status = "resolved";
      state.order = action.payload;
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.status = "false";
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.userOrder = action.payload;
    });
  },
});

export const { reset, getIngridientItem, deleteIngridientItem, addIngridientItem, addBunItem, updateIngridient, resetConstructor } =
  dataSlice.actions;

export default dataSlice.reducer;
