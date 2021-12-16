import { useState } from "react";

export const useLocalStorage = <T extends unknown>(
  key: string,
  initialValue: T
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
};
