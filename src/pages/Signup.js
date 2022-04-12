import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authUser } from "../components/AuthProvider";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Form from "../components/Form";
import Illustrator from "../components/Illustrator";
import TextInput from "../components/TextInput";
export default function Signup() {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aggre, setAgree] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = authUser();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("the was error");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("failled to create account");
    }
  }

  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustrator></Illustrator>
        <Form style={{ heiht: "500px" }} onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Enter Name"
            icon="person"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          ></TextInput>
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
          <TextInput
            type="password"
            placeholder="confirm password"
            icon="lock_clock"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></TextInput>
          <Checkbox
            text="I agree to the Terms &amp; Conditions"
            value={aggre}
            onChange={(e) => setAgree(e.target.value)}
          ></Checkbox>
          <Button type="submit" disabled={loading}>
            <span>Submit Now</span>
          </Button>
          {error && <p className="error">{error}</p>}
          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
