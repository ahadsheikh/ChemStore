import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  chemical: true,
  instrument: false,
  glassWare: false,
};

const dummy = {
  chemical: false,
  instrument: false,
  glassWare: false,
};

export const Shipment = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    currentTab: (state, action) => {
      return {
        ...state,
        chemical: false,
        instrument: false,
        glassWare: false,
        [action.payload]: true,
      };
    },
    closeModal: (state, action) => {
      return {
        ...state,
        chemical: false,
        instrument: false,
        glassWare: false,
      };
    },
  },
});

export const {currentTab, closeModal} = Shipment.actions;

export default Shipment.reducer;
