import React, { useEffect, useState, useCallback } from "react";
import WebApp from "@twa-dev/sdk";
import "./styles.scss";
import icons from "../../assets/icons";

const initDataURLSP = new URLSearchParams(WebApp.initData);
const id = initDataURLSP.get("id");
const username = initDataURLSP.get("username");
const hash = initDataURLSP.get("hash");
initDataURLSP.delete("hash");
initDataURLSP.sort();
const checkDataString = initDataURLSP.toString().replaceAll("&", "\n");

function ProfilePage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";

  const [error, setError] = useState<string>("");
  interface User {
    id: number;
    username: string;
    telegram_id: number;
    name: string;
    balance: number;
    role: string;
    done_tasks: number[];
    group_number: number;
  }

  const [user, setUser] = useState<User | null>(null);

  const makeRequest = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/users/telegram-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: id,
            username: username,
            data_check_string: checkDataString,
            hash: hash
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const loggedIn = await response.json();
      console.log("Ответ сервера (POST):", loggedIn);
      fetchUserData();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка при отправке данных на сервер:", error.message);
      } else {
        console.error("Ошибка при отправке данных на сервер:", error);
      }
    }
  }, []);

  async function fetchUserData() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/whoami`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        setUser(data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(
        `Ошибка при загрузке данных пользователя: ${
          error instanceof Error ? error.message : error
        }`
      );
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      makeRequest();
    }
  }, [makeRequest]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return user ? (
    <div>
      <header>
        <h1 className="header">профиль</h1>
        <img src={icons["settings"]} alt="Настройки" />
      </header>
      <div className="profile">
        <div className="profile__picture">
          <div className="profile__picture-avatar"></div>
          <h3 className="profile__subtitle">
            {user.username ? user.username : user.telegram_id}
          </h3>
        </div>
        <div className="profile__info">
          <div className="profile__info-block">
            <h3 className="profile__subtitle">фио</h3>
            <p className="profile__maintext">{user.name}</p>
          </div>
          <div className="profile__info-block">
            <h3 className="profile__subtitle">группа</h3>
            <p className="profile__maintext">{user.group_number}</p>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">баланс</p>
            <div className="profile__box">
              <img src={icons["coin_bag"]} alt="Баланс" />
              <p>{user.balance}</p>
            </div>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">выполнено заданий</p>
            <div className="profile__box">
              <p>{user.done_tasks.length}/35</p>
            </div>
          </div>
          <div className="profile__info-stats">
            <p className="profile__maintext">мои призы</p>
            <img
              src={icons["arrow"]}
              alt="Открыть"
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>тут нужно реализовать страницу ошибки</h1>
      <h1>{username}</h1>
    </div>
  );
}

export default ProfilePage;
