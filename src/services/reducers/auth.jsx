import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/api-constant";
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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

export const postLogIn = createAsyncThunk("data/postLogIn", async (form, { rejectWithValue }) => {
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
        setCookie("token", authToken, { expires: 180 });
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
  });
});

export const refreshToken = createAsyncThunk("data/refreshToken", async () => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken') }),
  })
    .then(res=>res.json())
});

export const fetchWithRefresh = createAsyncThunk("data/fetchWithRefresh", async (url) => {
  try {
    const res = await fetch(url);
    return await checkResponse(res);
  } catch (error) {
    console.log(error.message);
    if (error) {
      const refreshData = await refreshToken();
      console.log(refreshData());
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("token", refreshData.accessToken, { expires: 1200 });
      const res = await fetch(url);
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
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data;
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerData: null,
    logInData: {
      success: false,
    },
    userData: {},
  },
  reducers: {},
  extraReducers: {
    [postRegisterForm.fulfilled]: (state, action) => {
      state.registerData = action.payload;
    },
    [postLogIn.fulfilled]: (state, action) => {
      state.logInData = action.payload;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export default authSlice.reducer;
