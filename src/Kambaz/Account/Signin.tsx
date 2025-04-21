import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client"; // ✅ import API client
import "./signin.css";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) {
        setError("Invalid credentials");
        return;
      }
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    }
  };

  return (
    <Container className="signin-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Control 
              type="text"
              placeholder="Username"
              className="signin-input"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control 
              type="password"
              placeholder="Password"
              className="signin-input"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" className="signin-btn w-100" onClick={signIn}>
            Sign in
          </Button>
        </Form>

        <Link to="/Kambaz/Account/Signup" className="signin-link">
          Signup
        </Link>
      </div>
    </Container>
  );
}
