import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { generalSlice } from "./features/general/GeneralSlice";

export const Store = configureStore({
  reducer: {
    "general":generalSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
