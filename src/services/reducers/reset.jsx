import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const resetSlice = createSlice({
name:'reset',
initialState:{
    forgottenPasswordForm:{
        email: ''
    }
},
reducers:{

},
extraReducers:{

}
})

export default resetSlice.reducer;