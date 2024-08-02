import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

export default function EmployeesBis() {
  return (
    <div className="employees">
      <div className="error">
        <div className="error-link">
          <Link to="/"> &#x21A9; Home &#x1F3E1; &#x1F3E1;</Link>
        </div>
        <p>Error, this page doesn't exist!</p>
        <div className="error-link">
          <Link to="/employees">
            &#x1F4C8; &#x1F4C8; Current Employees &#x21AA;
          </Link>
        </div>
      </div>
    </div>
  );
}




