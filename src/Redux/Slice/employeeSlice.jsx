import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    add: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { add } = employeeSlice.actions;
export default employeeSlice.reducer;