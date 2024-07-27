import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyTable from "../../Components/Table/MyTable";
import labels from "../../data/labels";
import employeesMockData from "../../mocks/employees.json";
import "./Employees.css";

export default function Employees() {
  // Utilisez le hook useSelector pour récupérer les employés depuis le store
  const employeesFromStore = useSelector((state) => state.employee.employees);

  // Fusionnez les données mockées et celles du store
  const employees = [...employeesMockData, ...employeesFromStore];

  return (
    <div className="employees">
      <div className="table">
        <MyTable labels={labels} data={employees} />
      </div>

      <div className="employees-link">
        <Link to="/"> &#x21A9; Home</Link>
      </div>
    </div>
  );
}

