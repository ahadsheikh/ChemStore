import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const Auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setTokenHandler: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    removeTokenHandler: (state, action) => {
      return {
        ...state,
        token: null,
      };
    },
  },
});

export const { setTokenHandler, removeTokenHandler } = Auth.actions;

export default Auth.reducer;
