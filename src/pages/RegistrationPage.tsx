import TelegramLoginButton from "../components/TelegramLoginButton";

function RegistrationPage(): React.ReactElement {
  const handleTelegramAuth = async (user: { id: number; username: string }) => {
    console.log("Пользователь авторизован:", user);

    try {
      console.log(user.id);
      console.log(user.username);
      const response = await fetch(
        "http://188.225.58.99:8000/playit/auth/users/telegram-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telegram_id: 123456789,
            username: "example_user",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Ответ сервера:", data);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error.message);
    }
  };
  return (
    <div>
      <h1>Регистрация</h1>
      <TelegramLoginButton
        botName="playit_frontend_bot" // Замените на имя вашего бота
        dataOnauth={handleTelegramAuth}
        // dataAuthUrl="https://t.me/playit_frontend_bot?startapp=profile"
        // dataAuthUrl="/profile"
        buttonSize="large"
        usePic={true}
        cornerRadius={10}
      />
    </div>
  );
}

export default RegistrationPage;
