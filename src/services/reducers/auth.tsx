import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";
import { checkResponse, setCookie, getCookie } from "../../utils/handler-functions"

type TRegisterForm ={
  name: string;
  email: string;
  password: string;
}

const refreshToken = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken') }),
  })
    .then(checkResponse)
}

export const postRegisterForm = createAsyncThunk("data/postRegisterForm", async (form:TRegisterForm, { rejectWithValue }) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(form),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.success) {
        return data;
      }
    })
    .catch((error) => rejectWithValue(error.message));
});

export const getCookieRequest = createAsyncThunk("data/getCookieRequest", async () => {
  await fetch(`${API_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  })
  .then(checkResponse)
});

export const fetchWithRefresh = createAsyncThunk("data/fetchWithRefresh", async () => {
  try {
    const res = await fetch(`${API_URL}/auth/user`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": "Bearer " + getCookie("token"),
      },
    });
    return await checkResponse(res);
  } catch (error: any) {
    if (error.message === 'jwt malformed') {
      const refreshData = await refreshToken();
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("token", refreshData.accessToken.split("Bearer ")[1], { expires: 1200 });
      refreshData.headers.Authorization = refreshData.accessToken
      const res = await fetch(`${API_URL}/auth/user`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + getCookie("token"),
        },
      });
      return await checkResponse(res);
    } else {
      return Promise.reject(error);
    }
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
});

export default authSlice.reducer;