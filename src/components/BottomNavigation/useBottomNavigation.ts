import { useBoolean } from "@chakra-ui/hooks";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";

const allowedPathNames = ["schedules", "posts", "profile"];

export const useBottomNavigation = () => {
  const [visible, setVisible] = useBoolean(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { pathname } = useLocation();

  const handleChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  const convertedPathName = useMemo(
    () => pathname.split("/").join("").trim(),
    [pathname]
  );

  useEffect(() => {
    if (allowedPathNames.includes(convertedPathName)) {
      setVisible.on();
    } else {
      setVisible.off();
    }
  }, [setVisible, convertedPathName]);

  useEffect(() => {
    const currentTabIndex = allowedPathNames.findIndex((allowedPathName) => {
      return allowedPathName === convertedPathName;
    });

    if (currentTabIndex === -1) return;
    setTabIndex(currentTabIndex);
  }, [pathname, convertedPathName]);

  return { tabIndex, handleChange, visible, setVisible };
};
