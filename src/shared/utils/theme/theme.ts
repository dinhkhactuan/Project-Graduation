import { Theme } from "./type"; // Định nghĩa kiểu Theme nếu cần
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

export function setTheme(themeData: Partial<Theme>) {
  setDataStorage(STORAGE_KEY, { ...themeData });
}
