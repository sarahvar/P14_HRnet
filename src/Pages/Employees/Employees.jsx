import React from "react";
import { Link } from "react-router-dom";
import MyTable from "../../Components/Table/MyTable";
import labels from "../../data/labels";
import employeesMockData from "../../mocks/employees.json";
import "./Employees.css";

export default function Employees() {
  // Utilisez les données fictives importées
  const employees = employeesMockData;

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
