import { configureStore } from "@reduxjs/toolkit";
import ContainerReducer from "./Container";
import StoreManagment from "./StoreManagment";
export const store = configureStore({
  reducer: {
    container: ContainerReducer,
    StoreManagment: StoreManagment,
  },
});
