import { KEYS_STORAGE } from "@/service/host";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./user.api";
import { setDataCookie } from "@/shared/utils/ultils";
import { IUser } from "@/model/user.model";

interface IInitialAuthState {
  loading: boolean;
  user: null;
  updateUser: boolean;
  errorMessage: string | null;
}

const initialState: IInitialAuthState = {
  loading: false,
  errorMessage: null,
  updateUser: false,
  user: null,
};

const userAdapter = createEntityAdapter({
  selectId: (user: IUser) => user.userId,
});
const { actions, reducer } = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },

    resetAll(state) {
      state.loading = false;
      state.updateUser = false;
      state.user = null;
      state.errorMessage = null;
    },
    resetEntity(state) {
      state.updateUser = false;
      state.loading = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsers.fulfilled,
      (state, { payload }: PayloadAction<IUser[]>) => {
        userAdapter.setAll(state, payload);
        state.loading = false;
      }
    );
    builder.addCase(
      getUsers.rejected,
      (state, { payload }: PayloadAction<any>) => {
        if (payload?.msg?.includes("[423]")) {
          state.errorMessage = payload?.msg;
          setDataCookie(KEYS_STORAGE.USER_TOKEN);
          state.loading = false;
          return;
        }
        state.errorMessage = payload?.message || payload?.error || payload?.msg;
        state.loading = false;
      }
    );

    builder.addCase(
      createUser.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        if (payload.code === 0) {
          state.loading = false;
          return;
        }
        state.errorMessage = payload?.message || payload?.error || payload?.msg;
      }
    );
    builder.addCase(
      createUser.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.errorMessage = payload?.message || payload?.error || payload?.msg;
        state.loading = false;
      }
    );
  },
});
export const { fetching, resetAll, resetEntity } = actions;
export default reducer;
