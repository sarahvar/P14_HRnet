// src/Redux/selectors.js
import { createSelector } from 'reselect';

// Sélecteurs de base
const selectEmployees = (state) => state.employee.employees;

const selectLastEmployee = createSelector(
  [selectEmployees],
  (employees) => {
    const lastEmployee = employees[employees.length - 1];
    return lastEmployee || {};
  }
);

// Sélecteurs mémoisés
export const selectEmployeeDetails = createSelector(
  [selectLastEmployee],
  (lastEmployee) => [
    lastEmployee.firstName || "",
    lastEmployee.lastName || "",
    lastEmployee.startDate || "",
    lastEmployee.department || "",
    lastEmployee.birthDate || "",
    lastEmployee.street || "",
    lastEmployee.city || "",
    lastEmployee.state || "",
    lastEmployee.zipCode || "",
  ]
);
