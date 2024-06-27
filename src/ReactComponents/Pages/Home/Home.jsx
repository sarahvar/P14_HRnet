import Banner from "../../components/Banner/Banner";
import Form from "../../components/Form/Form";
import Footer from "../../components/Footer/Footer";

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
