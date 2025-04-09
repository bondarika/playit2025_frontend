import axios from 'axios';
import { UserData } from '../types/userData';

const API_BASE_URL = 'https://it-otdel.space/playit';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const submitTask = async (
  data: Record<string, any> | FormData,
  endpoint: string
) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await axios.post(
      `https://it-otdel.space/playit${endpoint}`,
      data,
      {
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    throw error;
  }
};

export const makeRequest = async (userData: UserData) => {
  try {
    const response = await axiosInstance.post('/auth/users/telegram-login', {
      telegram_id: userData?.id,
      username: userData?.username,
    });
    return response.data;
  } catch (error) {
    console.error('Error during Telegram login:', error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get('/auth/users/whoami');

    if (response.data && response.data.user) {
      return response.data.user;
    } else {
      throw new Error('User data not found in response');
    }
  } catch (error: any) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    throw error;
  }
};

export const fetchTasks = async (day: number) => {
  try {
    const response = await axiosInstance.get('/tasks/get-all', {
      params: { day },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const fetchPrizes = async () => {
  try {
    const response = await axiosInstance.get('/shop/get');
    return response.data.data;
  } catch (error) {
    console.error(
      'Ошибка при отправке данных на сервер:',
      error instanceof Error ? error.message : error
    );
  }
};

export const buyPrize = async (
  user_id: string,
  prize_title: string,
  value: number
) => {
  try {
    const response = await axiosInstance.post('/shop/exchange', {
      user_id,
      prize_title,
      value,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Ошибка при отправке данных на сервер:',
      error instanceof Error ? error.message : error
    );
  }
};
