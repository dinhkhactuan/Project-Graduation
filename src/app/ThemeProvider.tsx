"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { STORAGE_KEY } from "@/shared/utils/theme/theme";
import { setTheme } from "@/shared/utils/theme/theme";
import { THEME_DATA_DEFAULT } from "@/shared/utils/theme/themeOption";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const themeLocalStore = localStorage.getItem(STORAGE_KEY);
    if (themeLocalStore) {
      setIsLoading(false);
      return;
    }
  }, []);

  return children;
};

export default ThemeProvider;
