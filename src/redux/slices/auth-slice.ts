import config from "@/lib/config";
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  me: user | null,
};

const initialState: initialStateType = {
  me: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    login: (state, { payload }: { payload: user }) => {
      state.me = payload;
    },
    logout: (state) => {
      state.me = null;
      window.location.assign(config.LOGIN_URL);
    },
  },
});

export const { reset, logout, login } = authSlice.actions;

export const selectMe = (state: RootState) => state.auth.me;

export default authSlice.reducer;