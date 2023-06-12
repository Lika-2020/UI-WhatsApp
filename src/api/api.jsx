import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from '../store/slice/authSlice';

const checkCredentials = createAsyncThunk(
  'auth/checkCredentials',
  async ( {idInstance, apiTokenInstance}, { dispatch }) => {

    try {
      // Выполнение проверки данных пользователя через API GreenApi
      const response = await fetch(
        `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
        
        {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json'
            }
        }
      );

      if (response.ok) {
        // Данные верны, выполнение успешного входа
        dispatch(loginSuccess(idInstance, apiTokenInstance));
        const data = await response.json();
        return data;
      }
      // Данные неверны
      dispatch(loginFailure('Invalid credentials'));
      const errorData = await response.json();
      throw new Error(errorData.message); // Генерируем ошибку
    } catch (error) {
      dispatch(loginFailure('An error occurred during credential check'));
      throw new Error('Введите верные данные');
    }
  }
);

export default checkCredentials;
