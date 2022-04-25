import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";

export const registerSlice = createSlice({
name:'register',
initialState:{
    registerForm:{
        email: '',
        password: '',
        name: '',
    }
},
reducers:{

},
extraReducers:{

}
})

export default registerSlice.reducer;