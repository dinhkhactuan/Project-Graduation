import { KEYS_STORAGE } from "@/service/host";
import { IUser } from "@/model/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUserInfo,
  ILoginOAuth2Response,
  loginOAuth2,
  logoutOAuth2,
} from "./auth.api";
import { setDataCookie } from "@/shared/utils/ultils";

interface IInitialAuthState {
  loading: boolean;
  errorMessage: string | null;
  user: IUser | null;
  refreshToken: string | null;
  token: string | null;
  getUserInfoSuccess: boolean;
  loginSuccess: boolean;
  logoutSuccess: boolean;
}

const initialState: IInitialAuthState = {
  refreshToken: null,
  loading: false,
  errorMessage: null,
  token: null,
  user: null,
  getUserInfoSuccess: false,
  loginSuccess: false,
  logoutSuccess: false,
};

const { actions, reducer } = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.refreshToken = null;
      setDataCookie(KEYS_STORAGE.USER_TOKEN);
    },
    resetAll(state) {
      state.loading = false;
      state.loginSuccess = false;
      state.logoutSuccess = false;
      state.getUserInfoSuccess = false;
      state.token = null;
      state.user = null;
      state.errorMessage = null;
    },
    resetEntity(state) {
      state.getUserInfoSuccess = false;
      state.loginSuccess = false;
      state.logoutSuccess = false;
      state.loading = false;
      state.errorMessage = null;
    },
    setToken(state, { payload }: PayloadAction<string>) {
      setDataCookie(KEYS_STORAGE.USER_TOKEN, payload);
      state.token = payload;
    },
    setUserInfo(state, { payload }: PayloadAction<IUser | null>) {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginOAuth2.fulfilled,
      (state, { payload }: PayloadAction<ILoginOAuth2Response | any>) => {
        setDataCookie(KEYS_STORAGE.USER_TOKEN, payload.access_token);
        state.token = payload.access_token;
        state.refreshToken = payload.refresh_token;
        state.loginSuccess = true;
        state.loading = false;
      }
    );
    builder.addCase(
      loginOAuth2.rejected,
      (state, { payload }: PayloadAction<any>) => {
        if (payload?.msg?.includes("[423]")) {
          state.errorMessage = payload?.msg;
          state.loginSuccess = false;
          setDataCookie(KEYS_STORAGE.USER_TOKEN);
          state.token = null;
          state.user = null;
          state.refreshToken = null;
          state.loading = false;
          return;
        }
        setDataCookie(KEYS_STORAGE.USER_TOKEN);
        state.token = null;
        state.user = null;
        state.refreshToken = null;
        state.errorMessage = payload?.message || payload?.error || payload?.msg;
        state.loading = false;
        state.loginSuccess = false;
      }
    );

    builder.addCase(
      logoutOAuth2.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        if (payload.code === 0) {
          state.logoutSuccess = true;
          state.token = null;
          state.user = null;
          state.refreshToken = null;
          state.loginSuccess = false;
          state.loading = false;
          return;
        }
        state.errorMessage = payload?.message || payload?.error || payload?.msg;
      }
    );
    builder.addCase(
      logoutOAuth2.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.logoutSuccess = true;
        state.token = null;
        state.user = null;
        state.refreshToken = null;
        state.errorMessage = payload?.message || payload?.error || payload?.msg;
        state.loading = false;
        state.loginSuccess = false;
      }
    );

    // builder.addCase(
    //   getUserInfo.fulfilled,
    //   (state, { payload }: PayloadAction<any>) => {
    //     setDataCookie(KEYS_STORAGE.USER_INFO, {
    //       username: payload.data.userVO.username,
    //       userId: payload.data.userVO.userId,
    //     });
    //     state.user = payload.data.userVO;
    //     state.getUserInfoSuccess = true;
    //     state.errorMessage = null;
    //     state.loading = false;
    //   }
    // );
    // builder.addCase(getUserInfo.rejected, (state, { payload }) => {
    //   setDataCookie(KEYS_STORAGE.USER_TOKEN);
    //   state.user = null;
    //   state.token = null;
    //   state.getUserInfoSuccess = false;
    //   state.loading = false;
    // });
  },
});
export const {
  fetching,
  resetAll,
  resetEntity,
  logout,
  setUserInfo,
  setToken,
} = actions;
export default reducer;
