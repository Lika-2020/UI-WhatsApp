/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isBlockVisible: false,
  },
  reducers: {
    toggleBlockVisibility(state) {
      state.isBlockVisible = !state.isBlockVisible;
    },
  },
});

export const { toggleBlockVisibility } = uiSlice.actions;
export default uiSlice.reducer;
