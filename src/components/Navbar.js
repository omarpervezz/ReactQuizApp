import { Link } from "react-router-dom";
import images from "../assets/images/logo-bg.png";
import classes from "../styles/Navbar.module.css";
import Account from "./Account";
export default function Navbar() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={images} alt="Learn with Sumit Logo" />
            <h3>Learn with Sumit</h3>
          </Link>
        </li>
      </ul>
      <Account></Account>
    </nav>
  );
}
