import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authUser } from "../components/AuthProvider";
import Button from "../components/Button";
import Illustrator from "../components/Illustrator";
import LoginForm from "../components/LoginForm";
import TextInput from "../components/TextInput";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = authUser();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError("the did not match");
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustrator></Illustrator>
        <LoginForm style={{ height: "320px" }} onSubmit={handleSubmit}>
          <TextInput
            type="email"
            placeholder="Enter Email"
            icon="alternate_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextInput>
          <TextInput
            type="password"
            placeholder="Enter password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextInput>
          <Button type="submit" disabled={loading}>
            <span>Login</span>
          </Button>
          {error && <p className="error">{error}</p>}
          <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
          </div>
        </LoginForm>
      </div>
    </>
  );
}
