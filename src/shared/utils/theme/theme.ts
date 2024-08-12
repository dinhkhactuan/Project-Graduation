import React from "react";
import { Theme } from "./type"; // Định nghĩa kiểu Theme nếu cần

const THEME_DATA_DEFAULT: Theme = {
  colorPrimary: "#0178D4",
  colorTextPrimary: "#212529",
  colorTextSecondary: "#8E8E8E",
  colorInfoBg: "#F5F5F5",
  colorBgCapability: "#FFFFFF",
  colorTextTitleCapability: "#0178D4",
  colorBorderCapability: "#0178D4",
  colorBgSlideCompany: "#005690",
};

const STORAGE_KEY = "app_theme";

export function getTheme(): Theme {
  if (typeof window === "undefined") {
    return THEME_DATA_DEFAULT;
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY);
  return storedTheme ? JSON.parse(storedTheme) : THEME_DATA_DEFAULT;
}

export function setTheme(theme: Partial<Theme>): Theme {
  const newTheme = { ...THEME_DATA_DEFAULT, ...theme };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
  }
  return newTheme;
}

export function useTheme(): [Theme, (theme: Partial<Theme>) => void] {
  const [theme, setThemeState] = React.useState<Theme>(getTheme());

  React.useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const updateTheme = (newTheme: Partial<Theme>) => {
    const updatedTheme = setTheme(newTheme);
    setThemeState(updatedTheme);
  };

  return [theme, updateTheme];
}
