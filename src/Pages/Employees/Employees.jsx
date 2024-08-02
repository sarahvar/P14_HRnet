import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MyTable from "../../Components/Table/MyTable";
import labels from "../../data/labels";
import "./Employees.css";

export default function Employees() {
  // Utilisez le hook useSelector pour récupérer les employés depuis le store
  const employees = useSelector((state) => state.employee.employees);

  return (
    <div className="employees">
      <h1 className="page-title">Current Employees</h1> {/* Titre de la page */}

      <div className="table">
        <MyTable labels={labels} data={employees} />
      </div>

      <div className="employees-link">
        <Link to="/" className="home-link"> &#x21A9; Home</Link>
      </div>
    </div>
  );
}

