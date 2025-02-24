import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";

function TaskPage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";
  const [error, setError] = useState<string>(""); // Для хранения ошибок
  interface Task {
    id: string;
    day: string;
    brunch: string;
    title: string;
    description: string;
    points: number;
    is_active: boolean;
  }


// Unnamed: 17: null

// Аватарка: null

// Всего заданий: 15

// Вступительное сообщение: "Ну-с, тут вон какой аромат! Это от тебя, не иначе. Люблю такие запахи, наверное, из тебя борщ хороший сварится. Дам тебе шанс остатьс…"

// Готово: 1

// День: 1

// Задания по уровням: "6 легких↵6 средних↵3 сложных↵"

// Интересы (до 5): "1. Кудрово↵2. Стиль↵3. Чаепитие↵4. Не замужем/не женат↵5. Кулинария↵"

// Комменатрии: "приложить первую фотку↵https://docs.google.com/document/d/1xCugozvyAcE5wN14Dk-8DsRWexzxaqsD0Xc941H8YLw/edit?usp=sharing"

// Название ветки: "Старые и недобрые"

// Неправильно: "Огонь кипит, котёл бурлит, тут только тебя не хватает... Давай заново."

// Номер дня: 1

// О себе: "Для тебя буду кем захочешь, милок ;)↵Люблю загадки, ночные полеты, а моя изба оборудована как президентский люкс.↵Свайпай вправо и узнаешь…"

// Ответ: null

// Персонаж: "Баба Яга"

// Правильно: "Справился всё-таки...↵Иди уже, чтоб духу твоего здесь не было. Поесть нормально не даёшь, ужас!"

// Сложность: "Легкое"

// Стоимость: 100

// Формат ответа: "фото"

// Формат проверки: "модерация"

// №: 1

  const [tasks, setTasks] = useState<Tasks | null>(null);
  async function fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/get-all`, {
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

      // if (data.status === 0) {
      //   setTasks(data.data);
      //   console.log(tasks)
      // } else {
      //   setError(data.message);
      // }

      setTasks(data.data);
      console.log(data)
      // setError(data.message);
    } catch (error) {
      setError("Ошибка при загрузке данных.");
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <header>
        <h1 className="header">Задания</h1>
        {/* <img src={icons["coin_bag"]} alt="Баланс" /> */}
        <p style={{ color: "black" }}>{tasks?.data}</p>
      </header>
    </div>
  );
}

export default TaskPage;
