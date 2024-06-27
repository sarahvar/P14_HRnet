import Banner from "../../Components/Banner/Banner";
import Form from "../../Components/Form/Form";
import Footer from "../../Components/Footer/Footer";

import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Banner />
      <div className="all-form">
        <div className="form-header">
          <div className="form-name">HRnet</div>
          <div className="form-link">
            <Link to="/employees">View Current Employees &#x21AA;</Link>
          </div>
        </div>
        <Form />
      </div>
      <Footer />
    </div>
  );
}
