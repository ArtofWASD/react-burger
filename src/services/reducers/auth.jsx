import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";
import { checkResponse } from "../../utils/handler-functions"

function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name) {
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
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

export const postRegisterForm = createAsyncThunk("data/postRegisterForm", async (form, { rejectWithValue }) => {
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

export const LogIn = createAsyncThunk("data/postLogIn", async (form, { rejectWithValue }) => {
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
  } catch (error) {
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

export const editUserInformation = createAsyncThunk("data/editUserInformation", async (form)=>{
  await fetch(`${API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(form)
  }).then(res=>res.json())
  .then(data=>console.log(data))
})

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userState: false,
    userData: null
  },
  reducers: {},
  extraReducers: {
    [LogIn.fulfilled]: (state, action) => {
      state.userState = true;
      state.userData = action.payload;
    },
    [getUserData.fulfilled]: (state, action) => { 
      state.userState = true;
      state.userData = action.payload;
    },
    [getUserData.pending]: (state, action) => { 
      state.userState = 'loading'
    },
    [logOut.fulfilled]: (state) => {
      state.userState = false;
    },
  },
});

export default authSlice.reducer;