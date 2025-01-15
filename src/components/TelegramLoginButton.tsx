import React, { useRef, useEffect } from "react";

interface TelegramLoginButtonProps {
  botName: string;
  usePic?: boolean;
  className?: string;
  cornerRadius?: number;
  requestAccess?: boolean;
  dataAuthUrl?: string;
  dataOnauth?: (user: any) => void;
  buttonSize?: "large" | "medium" | "small";
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

const TelegramLoginButton: React.FC<TelegramLoginButtonProps> = ({
  botName,
  usePic = false,
  className = "",
  cornerRadius,
  requestAccess = true,
  dataAuthUrl,
  dataOnauth,
  buttonSize = "large",
  wrapperProps = {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!dataOnauth && !dataAuthUrl) {
      throw new Error(
        "Одно из свойств должно быть определено: dataAuthUrl (URL перенаправления) или dataOnauth (функция обратного вызова)."
      );
    }

    // Глобально устанавливаем функцию обратного вызова
    if (typeof dataOnauth === "function") {
      (window as any).TelegramLoginWidget = {
        dataOnauth: (user: any) => dataOnauth(user),
      };
    }

    // Создаем и настраиваем скрипт
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }

    if (requestAccess) {
      script.setAttribute("data-request-access", "write");
    }

    script.setAttribute("data-userpic", usePic.toString());

    if (dataAuthUrl) {
      script.setAttribute("data-auth-url", dataAuthUrl);
    } else {
      script.setAttribute(
        "data-onauth",
        "TelegramLoginWidget.dataOnauth(user)"
      );
    }

    script.async = true;

    ref.current.appendChild(script);

    // Очистка при размонтировании
    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [
    botName,
    buttonSize,
    cornerRadius,
    dataOnauth,
    requestAccess,
    usePic,
    dataAuthUrl,
  ]);

  return <div ref={ref} className={className} {...wrapperProps} />;
};

export default TelegramLoginButton;



