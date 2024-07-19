import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyTable from "../../Components/Table/MyTable";
import labels from "../../data/labels";
import "./Employees.css";

export default function Employees() {
  const employees = useSelector((state) => state.employee.employees);

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
