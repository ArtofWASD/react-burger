import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const logIn= createAsyncThunk("data/logIn", async (form, { rejectWithValue }) => {
    
})

export const authSlice = createSlice({
name:'auth',
initialState:{

},
reducers:{

},
extraReducers:{

}
})

export default authSlice.reducer;