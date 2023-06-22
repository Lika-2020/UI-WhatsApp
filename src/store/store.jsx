import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import messageReducer from './slice/messageSlice'
import uiReducer from './slice/uiSlice';
import chatReducer from './slice/chatSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    ui: uiReducer,
    chat: chatReducer,
    
  },
});

export default store;
