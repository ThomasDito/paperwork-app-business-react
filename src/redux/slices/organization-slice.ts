import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  organization: organization | null;
};

const initialState: initialStateType = {
  organization: null,
};

export const organizationSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setOrganization: (state, { payload }: { payload: organization }) => {
      state.organization = payload;
    },
  },
});

export const { reset, setOrganization } = organizationSlice.actions;

export const selectOrganization = (state: RootState) =>
  state.organization.organization;

export default organizationSlice.reducer;
