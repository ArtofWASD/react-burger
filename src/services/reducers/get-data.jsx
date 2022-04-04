import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const fetchData = createAsyncThunk("ingridients/fetchData", async (_,{rejectWithValue}) => {
 return fetch(`${API_URL}/ingredients`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Не пришёл ответ от сервера");
  })
  .then((data) => {
    if (data.success) {return data.data}
      throw new Error("Данные не поступили");
  })
  .catch((error) => rejectWithValue(error.message))
});

export const getDataSlice = createSlice({
  name: "ingridients",
  initialState: {
    ingridients: [],
    status: null,
    error: null,
  },
  reducers: {

  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.error = null;
      state.status = "Loading";
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.ingridients = action.payload
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "False";
      state.error = action.payload
    },
  },
});
export const {filterData} = getDataSlice.actions;
export default getDataSlice.reducer;
