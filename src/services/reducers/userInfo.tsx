import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";
import { checkResponse, getCookie } from "../../utils/handler-functions";

type TUpdatedUserInfo ={
    name: string|null,
    login: string|null,
}

type TUserData = {
    success: boolean,
    user:{
       email: string,
       name: string 
    }
}
export const getUserData = createAsyncThunk("data/getUserData", async () => {
    return fetch(`${API_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("token"),
      },
    })
      .then(checkResponse)
      .then((data) => data)
  });
  
  export const editUserInformation = createAsyncThunk("data/editUserInformation", async (form:TUpdatedUserInfo)=>{
    await fetch(`${API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify(form)
    }).then(res=>res.json())
    .then(data=>data)
  })

export const userInfoSlice =  createSlice({
    name: "user",
    initialState:{
        userState: false,
        userData: {success: false, user:{}} as TUserData
    },
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getUserData.fulfilled, (state, action)=>{
            state.userState = true;
            state.userData = action.payload;
        });
    }
})
export default userInfoSlice.reducer