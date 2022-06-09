import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../../utils/api-constant";
import { checkResponse, setCookie } from "../../../utils/handler-functions"

type TLogInForm = {
  name?: string;
  email?: string;
  password?: string;
}

export const logIn = createAsyncThunk("data/postLogIn", async (form:TLogInForm, { rejectWithValue }) => {
    return fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(form),
    })
      .then(checkResponse)
      .then((data) => {
        if (data.success) {
          const authToken = data.accessToken.split("Bearer ")[1];
          setCookie("token", authToken, { expires: 1200 });
          localStorage.setItem("refreshToken", data.refreshToken);
          return data;
        }
      })
      .catch((error) => rejectWithValue(error.message));
  });

  export const logOut = createAsyncThunk("data/logOut", async ()=>{
    return fetch(`${API_URL}/auth/logout`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({token: localStorage.getItem('refreshToken') })
    })
    .then(checkResponse)
    .then(data=>{
      if (data.success) {
        localStorage.setItem('refreshToken', '')
        setCookie('token', '', {expires: 0})
        window.location.reload()
      }
    })
  })

export const loginSlice = createSlice({
    name: "login",
    initialState:{
        loginState:false,
        loginData: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.loginState = true;
            state.loginData = action.payload;
        });
        builder.addCase(logOut.fulfilled, (state) => {
            state.loginState = false;
        })

    }
})

export default loginSlice.reducer