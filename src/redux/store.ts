import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { mainApi } from "./api/main-api";
import authSlice from "./slices/auth-slice";
import layoutSlice from "@/redux/slices/layout-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([mainApi.middleware]);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
