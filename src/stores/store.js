import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

export const store = configureStore({
  reducer: {
   // Add reducers here
   auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
