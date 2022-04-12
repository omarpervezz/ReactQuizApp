import { Link } from "react-router-dom";
import classes from "../styles/Account.module.css";
import { authUser } from "./AuthProvider";
export default function Account() {
  const { currentuser, logout } = authUser();
  return (
    <div className={classes.account}>
      {currentuser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentuser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout
          </span>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
