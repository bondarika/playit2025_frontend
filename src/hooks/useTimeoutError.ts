import { useEffect, useState } from 'react';

const useTimeoutError = (condition: boolean, timeoutMs: number = 30000) => {
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!condition) {
        setTimeoutError(true);
      }
    }, timeoutMs);

    if (condition) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [condition]);

  return timeoutError;
};

export default useTimeoutError;