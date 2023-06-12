/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    idInstance: '',
    apiTokenInstance: '',
    loggedIn: false,
    error: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
      state.loggedIn = true;
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.error = action.payload.error;
    },
  
    },
   
  
});

export const { loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
