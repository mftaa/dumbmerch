import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

const initialState = {
  user: cookie.get("eu-user") ? JSON.parse(cookie.get("eu-user")) : null,
  token: cookie.get("eu-token") ?? null,
  
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.login.user;
      cookie.set("eu-user", JSON.stringify(payload.login.user));
      if (payload.login.token) {
        state.token = payload.login.token;
        state.privatePassword = payload.password;
        cookie.set("eu-token", payload.login.token);
      }
    },

    setNewUser: (state, { payload }) => {
      state.user = payload.register.user;
      state.token = payload.register.token;

      cookie.set("eu-user", JSON.stringify(payload.register.user));
      cookie.set("eu-token", payload.register.token);
    },

    removeUser: (state) => {
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      cookie.remove("eu-token");
      cookie.remove("github");
      cookie.remove("token");
      cookie.remove("username");
    },
    setTitle: (state, { payload }) => {
      state.title = payload.title;
    },
  },
});

export const {
  setUser,
  removeUser,
  setTitle,
  setNewUser,
  logout,
  setUpdateUser,
 
} = counterSlice.actions;

export default counterSlice.reducer;
