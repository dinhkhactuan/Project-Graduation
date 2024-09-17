import axiosInstance from "@/service/config/axios-interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefix = "/advertisement";

export const getAdvertiments = createAsyncThunk(
  `list-advertisement`,
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`${prefix}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAdvertiment = createAsyncThunk(
  `get-advertisement`,
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`${prefix}/${id}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createAdvertiment = createAsyncThunk(
  `createUser-advertisement`,
  async (body: any, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`${prefix}`, body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAdvertiment = createAsyncThunk(
  `update-advertisement`,
  async (body: any, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`${prefix}`, body);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdvertiment = createAsyncThunk(
  `delete-advertisement`,
  async (id: Number, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`${prefix}/${id}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
