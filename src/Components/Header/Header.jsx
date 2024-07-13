import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/WealthHealth.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="header-img">
        <Link to="/">
          <img
            className="logo"
            src={logo}
            alt="logo de WealthHealth"
            width="136" 
            height="146" 
          />
        </Link>
      </div>
    </div>
  );
}

