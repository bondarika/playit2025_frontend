import axios from 'axios';
import { SubmitTaskRequest } from '../types/submitTaskRequest';
import { UserData } from '../types/userData';

const API_BASE_URL = 'https://it-otdel.space/playit';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const submitTask = async (data: SubmitTaskRequest): Promise<void> => {
  try {
    const response = await axiosInstance.post('/api/submit-task', data);
    console.log('Response:', response.data);
    alert('Task submitted successfully!');
  } catch (error) {
    console.error('Error submitting task:', error);
    alert('Failed to submit the task.');
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
    const data = response.data;
    if (data.status === 'success') {
      return data.user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
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
