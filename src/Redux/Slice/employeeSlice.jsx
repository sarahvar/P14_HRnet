import { createSlice } from '@reduxjs/toolkit';
import employeesMockData from '../../mocks/employees.json';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: employeesMockData,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;

