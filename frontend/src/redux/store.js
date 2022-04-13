import { configureStore } from "@reduxjs/toolkit";
import ContainerReducer from "./Container";
import StoreManagment from "./StoreManagment";
import Shipment from "./Shipment";
import Auth from "./Auth";

export const store = configureStore({
  reducer: {
    container: ContainerReducer,
    StoreManagment: StoreManagment,
    shipment: Shipment,
    auth: Auth,
  },
});
