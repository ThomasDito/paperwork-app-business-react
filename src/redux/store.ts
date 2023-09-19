import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { paperworkBaseApi } from "@/redux/api/paperwork/base-api";
import { mainApi } from "./api/main-api";
import authSlice from "./slices/auth-slice";
import layoutSlice from "@/redux/slices/layout-slice";
import { businessBaseApi } from "@/redux/api/business/base-api";
import organizationSlice from "@/redux/slices/organization-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    organization: organizationSlice,
    layout: layoutSlice,
    [mainApi.reducerPath]: mainApi.reducer,
    [paperworkBaseApi.reducerPath]: paperworkBaseApi.reducer,
    [businessBaseApi.reducerPath]: businessBaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      mainApi.middleware,
      paperworkBaseApi.middleware,
      businessBaseApi.middleware,
    ]);
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
