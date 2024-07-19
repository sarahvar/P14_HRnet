import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../Slice/employeeSlice";

const store = configureStore({
  reducer: {
    employee: employeeSlice,
  },
});

export default store;
