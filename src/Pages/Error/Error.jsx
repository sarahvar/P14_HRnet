import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Error.css";

export default function NotFound() {
  useEffect(() => {
    document.body.classList.add("error-page-body");
    return () => {
      document.body.classList.remove("error-page-body");
    };
  }, []);

  return (
    <div className="error-page">
      <div className="error">
        <div className="error-link">
          <Link to="/"> &#x21A9; Home &#x1F3E1; &#x1F3E1;</Link>
        </div>
        <h1 className="error-code">404</h1>
        <p className="error-message">Error, this page doesn't exist!</p>
        <div className="error-link">
          <Link to="/employees">
            &#x1F4C8; &#x1F4C8; Current Employees &#x21AA;
          </Link>
        </div>
      </div>
    </div>
  );
}




