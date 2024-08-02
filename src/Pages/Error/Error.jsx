import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

export default function NotFound() {
  return (
    <div className="employees">
      <div className="error">
        <div className="error-link">
          <Link to="/"> &#x21A9; Home &#x1F3E1; &#x1F3E1;</Link>
        </div>
        <h1 className="text-8xl font-extrabold tracking-tight lg:text-9xl">
                404
            </h1>
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




