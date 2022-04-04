import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
 return fetch(`${API_URL}/ingredients`)
  .then((result) => result.json())
  .then((data)=>{
    return data.data
  })
});

export const getDataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {
    filterData(state, action) {
      state.data.filter((item) => {
        if (item.type === action.payload) {
          return state.data = item;
        }
      });
    }
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.error = null;
      state.status = "Loading";
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.data = action.payload
    },
    [fetchData.rejected]: (state) => {
      state.status = "False";
    },
  },
});
export const {filterData} = getDataSlice.actions;
export default getDataSlice.reducer;
