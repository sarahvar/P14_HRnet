import logo from "../../../assets/HRnet logo.gif";
import "./Banner.css";

export default function Banner() {
  return (
    <div className="banner">
      <h2>Your application to manage human ressources</h2>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}
