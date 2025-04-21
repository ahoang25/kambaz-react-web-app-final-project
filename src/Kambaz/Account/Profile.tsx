import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Button } from "react-bootstrap";
import { setCurrentUser } from "./reducer";
import * as client from "./client"; 
import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [profile, setProfile] = useState<any>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) {
        try {
          const user = await client.profile();
          setProfile(user);
          dispatch(setCurrentUser(user));
        } catch (err) {
          console.error("PROFILE ERROR:", err);
          navigate("/Kambaz/Account/Signin");
        }
      } else {
        setProfile(currentUser);
      }
    };
    loadProfile();
  }, [currentUser, navigate]);

  const save = async () => {
    try {
      const updated = await client.updateUser(profile);
      dispatch(setCurrentUser(updated));
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  return (
    <Container className="profile-container">
      <h2 className="profile-title">Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {profile && (
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={profile.username || ""}
              placeholder="Username"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              value={profile.password || ""}
              placeholder="Password"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={profile.firstName || ""}
              placeholder="First Name"
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              value={profile.lastName || ""}
              placeholder="Last Name"
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="date"
              value={profile.dob?.substring(0, 10) || ""}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              value={profile.email || ""}
              placeholder="Email"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              value={profile.role || "STUDENT"}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" className="mb-2 w-100" onClick={save}>
            Save
          </Button>

          <Button variant="danger" className="w-100" onClick={signout}>
            Sign out
          </Button>
        </Form>
      )}
    </Container>
  );
}
