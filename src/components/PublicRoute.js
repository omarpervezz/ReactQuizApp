import { Redirect, Route } from "react-router-dom";
import { authUser } from "./AuthProvider";
export default function PublicRoute({ component: Component, ...rest }) {
  const { currentuser } = authUser();
  return !currentuser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/" />
  );
}
