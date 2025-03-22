import { UserData } from '../types/user';

const API_BASE_URL = 'https://it-otdel.space/playit';

export const makeRequest = async (userData: UserData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/telegram-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telegram_id: userData?.id,
        username: userData?.username,
        // data_check_string: checkDataString,
        // hash: hash,
      }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    return await response.json();
    // const loggedIn = await response.json();
    // console.log("Ответ сервера (POST):", loggedIn);
    // if (loggedIn.status === "success") {
    //   fetchUserData();
    // } else {
    //   console.error("Ошибка: логин не выполнен", loggedIn.message);
    // }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка при отправке данных на сервер:', error.message);
    } else {
      console.error('Ошибка при отправке данных на сервер:', error);
    }
  }
};

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/whoami`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status === 'success') {
      return data.user;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(
      'Ошибка при отправке данных на сервер:',
      error instanceof Error ? error.message : error
    );
  }
};

export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks/get-all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Не удалось получить задания');
  }
  const data = await response.json();
  return data.data;
};
