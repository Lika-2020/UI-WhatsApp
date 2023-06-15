import { createAsyncThunk } from '@reduxjs/toolkit';

// Создание асинхронного действия для отправки сообщения
export const sendMessage = createAsyncThunk(
  'sendMessage',
  async ({ idInstance, apiTokenInstance, phoneNumber, message}) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const payload = JSON.stringify({
      chatId: `${phoneNumber}@c.us`,
      message,
    });

    console.log(payload)

    console.log(idInstance)
    console.log(apiTokenInstance)

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

// Создание асинхронного действия для получения сообщений
export const receiveMessages = createAsyncThunk(
  'messages/receive',
  async ({ idInstance, apiTokenInstance }) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    console.log(idInstance)
    console.log(apiTokenInstance)

      const response = await fetch(url);
      const webhookBody = await response.json();

    return webhookBody;
        
  }
);

export const deleteReсeivedMessage = createAsyncThunk (
  'delete/receive',
  async ({ idInstance, apiTokenInstance, receiptId  }) => {
 
    const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
    const response = await fetch(url, {
      method: 'DELETE',

    });

    if (response.ok) {
      return receiptId; 
    } 
    console.log(receiptId)
    return response.json();
  }
)