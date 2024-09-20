import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  createAdvertiment,
  deleteAdvertiment,
  getAdvertiment,
  getAdvertiments,
  getAdvertimentByUser,
  updateAdvertiment,
  approvalAdvertiment,
} from "./advertiment.api";
import { RootState } from "../reducers";
import { IResponse } from "@/shared/type/IResponse";
import { IAdvertisement } from "@/model/advertisement.model";

interface IInitialAdvertisementState {
  loading: boolean;
  advertisement: IAdvertisement | null;
  updateStatusUser: boolean;
  deleteStatusUser: boolean;
  approvalStatus: boolean;
  errorMessage: string | null;
}

const initialState: IInitialAdvertisementState = {
  loading: false,
  errorMessage: null,
  updateStatusUser: false,
  advertisement: null,
  deleteStatusUser: false,
  approvalStatus: false,
};

const advertisementAdapter = createEntityAdapter({
  selectId: (advertisement: IAdvertisement) =>
    advertisement.advertisementId ?? ("defaultId" as EntityId),
});

const { actions, reducer } = createSlice({
  name: "advertisementSlice",
  initialState: advertisementAdapter.getInitialState({ initialState }),
  reducers: {
    fetching(state) {
      state.initialState.loading = true;
    },

    resetAll(state) {
      state.initialState.loading = false;
      state.initialState.approvalStatus = false;
      state.initialState.updateStatusUser = false;
      state.initialState.deleteStatusUser = false;
      state.initialState.advertisement = null;
      state.initialState.errorMessage = null;
    },
    resetEntity(state) {
      state.initialState.updateStatusUser = false;
      state.initialState.deleteStatusUser = false;
      state.initialState.approvalStatus = false;
      state.initialState.loading = false;
      state.initialState.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAdvertiments.fulfilled,
      (state, { payload }: PayloadAction<IResponse<IAdvertisement[]>>) => {
        advertisementAdapter.setAll(state as any, payload.data);
        state.initialState.loading = false;
      }
    );
    builder.addCase(
      getAdvertiments.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
      }
    );

    builder.addCase(
      getAdvertimentByUser.fulfilled,
      (state, { payload }: PayloadAction<IResponse<IAdvertisement[]>>) => {
        advertisementAdapter.setAll(state as any, payload.data);
        state.initialState.loading = false;
      }
    );
    builder.addCase(
      getAdvertimentByUser.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
      }
    );

    builder.addCase(
      getAdvertiment.fulfilled,
      (state, { payload }: PayloadAction<IAdvertisement>) => {
        state.initialState.advertisement = payload;
        state.initialState.loading = false;
      }
    );
    builder.addCase(
      getAdvertiment.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
      }
    );

    builder.addCase(
      createAdvertiment.fulfilled,
      (state, { payload }: PayloadAction<IResponse<any>>) => {
        state.initialState.loading = false;
        state.initialState.updateStatusUser = true;
      }
    );
    builder.addCase(
      createAdvertiment.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
        state.initialState.updateStatusUser = false;
      }
    );
    builder.addCase(
      updateAdvertiment.fulfilled,
      (state, { payload }: PayloadAction<IResponse<any>>) => {
        state.initialState.loading = false;
        state.initialState.updateStatusUser = true;
      }
    );
    builder.addCase(
      updateAdvertiment.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
        state.initialState.updateStatusUser = false;
      }
    );

    builder.addCase(
      approvalAdvertiment.fulfilled,
      (state, { payload }: PayloadAction<IResponse<any>>) => {
        state.initialState.loading = false;
        state.initialState.approvalStatus = true;
      }
    );
    builder.addCase(
      approvalAdvertiment.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
        state.initialState.approvalStatus = false;
      }
    );

    builder.addCase(
      deleteAdvertiment.fulfilled,
      (state, { payload }: PayloadAction<IResponse<any>>) => {
        state.initialState.loading = false;
        state.initialState.deleteStatusUser = true;
        state.initialState.updateStatusUser = false;
      }
    );
    builder.addCase(
      deleteAdvertiment.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.initialState.errorMessage =
          payload?.message || payload?.error || payload?.msg;
        state.initialState.loading = false;
        state.initialState.updateStatusUser = false;
        state.initialState.deleteStatusUser = false;
      }
    );
  },
});
export const { fetching, resetAll, resetEntity } = actions;
export const advertisementSelectors =
  advertisementAdapter.getSelectors<RootState>((state) => state.advertiment);
export default reducer;
