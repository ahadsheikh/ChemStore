import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  chemical: false,
  instrument: false,
  glassWare: false,
};

const dummy = {
  chemical: false,
  instrument: false,
  glassWare: false,
};

export const Container = createSlice({
  name: "counter",
  initialState,
  reducers: {
    openModal: (state, action) => {
      return {
        ...dummy,
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

export const {openModal, closeModal} = Container.actions;

export default Container.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   chemical: false,
//   instrument: false,
//   glassWare: false,
// };

// export const Container = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     openModal: (state, action) => {
//       return {
//         ...state,
//         [action.payload]: !state[action.payload],
//       };
//     },
//     closeModal: (state, action) => {
//       return {
//         ...state,
//         chemical: false,
//         instrument: false,
//         glassWare: false,
//       };
//     },
//   },
// });

// export const { openModal, closeModal } = Container.actions;

// export default Container.reducer;

