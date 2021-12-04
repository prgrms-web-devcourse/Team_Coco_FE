import { useState } from "react";

export const useBottomNavigation = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (index: number) => {
    setTabIndex(index);
  };

  return { tabIndex, handleChange };
};
