import axiosInstance from "@/service/config/axios-interceptor";
import { KEYS_STORAGE } from "@/service/host";
import { IUser } from "@/model/user.model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataCookie } from "@/shared/utils/ultils";

export interface ILoginForm {
  // randomStr: string;
  code: string;
  grant_type: string;
  scope: string;
  username: string;
  password: string;
  rememberMe: boolean;
  label?: string;
}

export const getUserInfo = createAsyncThunk(
  `user-info`,
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`admin/user/info`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface ILoginOAuth2Response {
  user_info: IUser;
  access_token: string;
  refresh_token: string;
  user_id: string;
  username: string;
}

export const loginOAuth2 = createAsyncThunk(
  `login-oauth`,
  async (body: ILoginForm, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post<ILoginOAuth2Response>(
        `auth/oauth2/token`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutOAuth2 = createAsyncThunk(
  `logout-oauth`,
  async (_, thunkAPI) => {
    try {
      const token = getDataCookie(KEYS_STORAGE.USER_TOKEN);

      const { data } = await axiosInstance.delete(`auth/token/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
