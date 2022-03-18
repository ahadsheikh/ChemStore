import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStore: -1,
  issueLab: "",
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
    issueLabHandler: (state, action) => {
      return {
        ...state,
        issueLab: action.payload,
      };
    },
  },
});

export const { storeHandler, issueLabHandler } = StoreManagment.actions;

export default StoreManagment.reducer;
