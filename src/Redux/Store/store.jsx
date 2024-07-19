import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../Slice/employeeSlice";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export default store;
