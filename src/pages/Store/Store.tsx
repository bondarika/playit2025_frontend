﻿import { useEffect, useState } from "react";
import icons from "../../assets/icons";

function StorePage(): React.ReactElement {
  const API_BASE_URL = "https://it-otdel.space/playit";
  // const [item, setItems] = useState<Items | null>(null);
  const [error, setError] = useState<string>(""); // Для хранения ошибок
  async function fetchItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/shop/get`, {
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
      // const items:
      console.log(data);
    } catch (error) {
      setError("Ошибка при загрузке данных.");
      console.error(
        "Ошибка при отправке данных на сервер:",
        error instanceof Error ? error.message : error
      );
    }
  }
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <div>
      <header>
        <h1 className="header">МАГАЗИН</h1>
        {/* <img src={icons["coin_bag"]} alt="Баланс" /> */}
      </header>
    </div>
  );
}

export default StorePage;
