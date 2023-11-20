import config from "@/lib/config";
import { RootState } from "@/redux/store";
import { organization, role_item_type, user } from "@/types/schema";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  me: user | null;
  organization: organization | null;
  roles: Array<{ module_key: string; permission: role_item_type }>;
};

const initialState: initialStateType = {
  me: null,
  organization: null,
  roles: [],
};

export const authSlice = createSlice({
  name: "auth",
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
    setOrganization: (state, { payload }: { payload: organization }) => {
      state.organization = payload;
    },

    setRoles: (
      state,
      {
        payload,
      }: { payload: Array<{ module_key: string; permission: role_item_type }> }
    ) => {
      state.roles = payload;
    },
  },
});

// Actions
export const { reset, logout, login, setOrganization, setRoles } =
  authSlice.actions;

// Selectors
export const selectMe = (state: RootState) => state.auth.me;
export const selectOrganization = (state: RootState) => state.auth.organization;
export const selectRoles = (state: RootState) => state.auth.roles;

export default authSlice.reducer;
