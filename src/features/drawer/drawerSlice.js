import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    value: true
  },
  reducers: {
    openNavBar: state => {
      state.value = true;
    },
    closeNavBar: state => {
      state.value = false;
    }
  }
});

export const { openNavBar, closeNavBar } = drawerSlice.actions;

export const selectDrawer = state => state.drawer.value;

export default drawerSlice.reducer;