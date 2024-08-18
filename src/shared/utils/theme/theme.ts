import React from "react";
import { Theme } from "./type"; // Định nghĩa kiểu Theme nếu cần
import { THEME_DATA_DEFAULT } from "./themeOption";
import { setDataStorage } from "../ultils";

export const STORAGE_KEY = "app_theme";
export enum Theme_Option {
  THEME1 = "theme1",
  THEME2 = "theme2",
  THEME3 = "theme3",
  THEME4 = "theme4",
}

export const Theme_arrary = [
  Theme_Option.THEME1,
  Theme_Option.THEME2,
  Theme_Option.THEME3,
  Theme_Option.THEME4,
];

export function getTheme(): Theme {
  if (typeof window === "undefined") {
    return THEME_DATA_DEFAULT;
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY);
  return storedTheme ? JSON.parse(storedTheme) : THEME_DATA_DEFAULT;
}

export function setTheme(themeData: Partial<Theme>) {
  setDataStorage(STORAGE_KEY, { ...themeData });
}
