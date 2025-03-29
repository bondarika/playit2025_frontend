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

export const submitTask = async (data: FormData): Promise<void> => {
  try {
    const response = await axiosInstance.post('/api/submit-task', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error submitting task:', error);
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
    const response = await axios.get('/auth/users/whoami');
    console.log('Full API Response:', response);

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

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get('/tasks/get-all');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
