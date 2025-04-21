import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import "./signup.css";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async () => {
    try {
      const newUser = await client.signup(user);
      dispatch(setCurrentUser(newUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Container className="signup-container">
      <h2 className="signup-title">Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" className="w-100 mb-2" onClick={signupHandler}>
          Signup
        </Button>

        <Link to="/Kambaz/Account/Signin" className="signup-link">
          Signin
        </Link>
      </Form>
    </Container>
  );
}
