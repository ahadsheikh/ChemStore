import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  flag: false,
};

export const FileManagment = createSlice({
  name: "FileManagment",
  initialState,
  reducers: {
    setFlagHandler: (state, action) => {
      return {
        ...state,
        flag: !state.flag,
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

export const {setFlagHandler, removeTokenHandler} = FileManagment.actions;

export default FileManagment.reducer;
