import { Redirect, Route } from "react-router-dom";
import { authUser } from "./AuthProvider";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentuser } = authUser();
  return currentuser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
