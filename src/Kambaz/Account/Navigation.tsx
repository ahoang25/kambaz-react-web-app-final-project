import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./account.css";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation">
      <ListGroup variant="flush">
        {links.includes("Signin") && (
          <ListGroup.Item>
            <Link to="/Kambaz/Account/Signin" className="nav-link active">
              Signin
            </Link>
          </ListGroup.Item>
        )}

        {links.includes("Signup") && (
          <ListGroup.Item>
            <Link to="/Kambaz/Account/Signup" className="nav-link text-danger">
              Signup
            </Link>
          </ListGroup.Item>
        )}

        {links.includes("Profile") && (
          <ListGroup.Item>
            <Link to="/Kambaz/Account/Profile" className="nav-link text-danger">
              Profile
            </Link>
          </ListGroup.Item>
        )}

        {currentUser && currentUser.role === "ADMIN" && (
          <ListGroup.Item>
            <Link
              to="/Kambaz/Account/Users"
              className={`nav-link text-danger ${active("Users")}`}
            >
              Users
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}
