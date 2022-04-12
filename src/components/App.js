import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Signup from "../pages/Signup";
import "../styles/App.css";
import { AuthProvider } from "./AuthProvider";
import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PublicRoute exact path="/signup" component={Signup}></PublicRoute>
            <PublicRoute exact path="/login" component={Login}></PublicRoute>
            <PrivateRoute
              exact
              path="/quiz/:id"
              component={Quiz}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/result/:id"
              component={Result}
            ></PrivateRoute>
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}
export default App;
