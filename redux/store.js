import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../redux/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
