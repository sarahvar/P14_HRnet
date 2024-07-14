
import "./Header.css";
import logo from "../../assets/WealthHealth.webp";

export default function Header() {
  return (
    <div className="header">
      <div className="header-img">
          <img
            className="logo"
            src={logo}
            alt="logo de WealthHealth"
            width="136" 
            height="146"
          />
      </div>
    </div>
  );
}

