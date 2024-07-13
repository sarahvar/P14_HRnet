
import Form from "../../Components/Form/Form";


import { Link } from "react-router-dom";
import "./Home.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';

library.add(fas);

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
