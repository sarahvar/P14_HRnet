import React from "react";


import { Link } from "react-router-dom";
import MyTable from "../../Components/Table/MyTable";
import labels from "../../data/labels";
import "./Employees.css";

export default function Employees() {
  const employees = JSON.parse(localStorage.getItem("employees"));

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
