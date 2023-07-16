import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./GlobalSlice";
import authReducer from "./AuthSlice";
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
  },
});

export default store;
