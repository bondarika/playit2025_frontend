import { useState, useEffect, useCallback } from "react";
import { makeRequest, fetchUserData } from "../services/api";
import { User } from "../types/user"

export function useProfile(userData: { id: number; username: string }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [error, setError] = useState<string | null>(null);

  const authenticateUser = useCallback(async () => {
    try {
      await makeRequest(userData);
      const fetchedUser = await fetchUserData();
      setUser(fetchedUser);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Неизвестная ошибка");
    }
  }, [userData]);

  useEffect(() => {
    if (!user) {
      authenticateUser();
    }
  }, [user, authenticateUser]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return { user, error, setUser };
}
