import axiosInstance from "@/service/config/axios-interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/approval-requests";

export const getApprovals = createAsyncThunk(
  `list-approval-requests`,
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`${prefix}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
