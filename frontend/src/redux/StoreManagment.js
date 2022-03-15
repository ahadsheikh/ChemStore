import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStore: -1,
};

export const StoreManagment = createSlice({
  name: "storeManagment",
  initialState,
  reducers: {
    storeHandler: (state, action) => {
      return {
        ...state,
        activeStore: action.payload,
      };
    },
  },
});

export const { storeHandler } = StoreManagment.actions;

export default StoreManagment.reducer;
