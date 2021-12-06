import { useState, useCallback } from "react";

export const usePostsPage = () => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleChange = useCallback((index: number) => {
    setContentIndex(index);
  }, []);

  return { contentIndex, handleChange };
};
