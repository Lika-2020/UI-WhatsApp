import { createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://api.green-api.com';

// Создание асинхронного действия для отправки сообщения
export const sendMessage = createAsyncThunk(
  'sendMessage',
  async ({ idInstance, apiTokenInstance, phoneNumber, message }) => {
    const url = `${API_BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const payload = JSON.stringify({
      chatId: `${phoneNumber}@c.us`,
      message,
    });

    console.log(payload);

    console.log(idInstance);
    console.log(apiTokenInstance);

    const headers = {
      'Content-Type': 'text/plain',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: payload,
    });

    const text = await response.text();
    return text;
  }
);

export const deleteReceivedNotification = createAsyncThunk(
  'notifications/delete',
  async ({ idInstance, apiTokenInstance, receiptId }) => {


    const response = await fetch(
      `${API_BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    return data;
  }
);


// Создание асинхронного действия для получения сообщений
export const receiveMessages = createAsyncThunk(
  'notifications/fetch',
  async ({ idInstance, apiTokenInstance }) => {
    console.log(idInstance);
    console.log(apiTokenInstance);

    const response = await fetch(
      `${API_BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );
    const data = await response.json();

    return data;
  }
);
