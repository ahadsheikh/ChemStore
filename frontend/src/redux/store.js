import { configureStore } from "@reduxjs/toolkit";
import ContainerReducer from "./Container";
export const store = configureStore({
  reducer: {
    container: ContainerReducer,
  },
});
