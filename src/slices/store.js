import { configureStore } from "@reduxjs/toolkit";
//on importe nos reducers pour les injecter dans le store
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
