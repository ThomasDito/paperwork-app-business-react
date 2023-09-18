import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  sidebarIsCollapsed: boolean;
};

const initialState: initialStateType = {
  sidebarIsCollapsed: window.localStorage.getItem("sidebarCollapsed") == "true",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    handleSidebarCollapses: (state, action) => {
      state.sidebarIsCollapsed = action.payload;
      window.localStorage.setItem("sidebarCollapsed", action.payload);
    },
  },
});

export const { handleSidebarCollapses } = layoutSlice.actions;

export default layoutSlice.reducer;
