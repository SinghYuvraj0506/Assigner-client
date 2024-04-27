import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { generalSlice } from "./features/general/GeneralSlice";
import { authSlice } from "./features/auth/authSlice";


export const Store = configureStore({
  reducer: {
    "general":generalSlice.reducer,
    "auth": authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


const initializeApp = async () => {
  await Store.dispatch(apiSlice.endpoints.refershToken.initiate({},{forceRefetch:true}))
  await Store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}))
}


initializeApp();