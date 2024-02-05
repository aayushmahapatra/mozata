import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MARKETPLACE_SERVER } from "../../config";
import axios from "axios";
import { IDishState } from "./dish.interfaces";

export const fetchDishesByKeyword = createAsyncThunk(
  "dishes/fetchByKeyword",
  async (data: { token: string; keyword: string }) => {
    const response = await axios.get(
      `${MARKETPLACE_SERVER}/dish/search?keyword=${data.keyword}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const initialState: IDishState = {
  searchResults: [],
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDishesByKeyword.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const { clearSearch } = dishSlice.actions;

export default dishSlice.reducer;
