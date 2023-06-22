/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { sendMessage, receiveMessages, deleteReceivedNotification} from '../../api/apiMessage';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    error: null,
    message: null,
    phoneNumber: '',
    incomingMessages: [], // для хранения входящих сообщений
  },
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    addIncomingMessage: (state, action) => {
      state.incomingMessages = [...state.incomingMessages, action.payload];
    },

    
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(receiveMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(receiveMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.incomingMessages.push(action.payload);
      })
      .addCase(receiveMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) .addCase(deleteReceivedNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReceivedNotification.fulfilled, (state) => {
        state.loading = false;
        // Обработка успешного удаления уведомления
      })
      .addCase(deleteReceivedNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectMessages = (state) => state.message.incomingMessages;

export const { setPhoneNumber, addIncomingMessage} = messageSlice.actions;

export default messageSlice.reducer;
