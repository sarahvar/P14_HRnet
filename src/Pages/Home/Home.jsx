
import Form from "../../Components/Form/Form";


import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
  
      <div className="all-form">
        <div className="form-header">
          <div className="form-name">HRnet</div>
          <div className="form-link">
            <Link to="/employees">View Current Employees</Link>
          </div>
        </div>
        <Form />
      </div>

    </div>
  );
}
