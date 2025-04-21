import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  console.log("🔐 ProtectedRoute > currentUser:", currentUser);
  console.log("🔐 Allowed roles:", allowedRoles);

  if (!currentUser) {
    console.warn("⚠️ No user signed in. Redirecting to sign in.");
    return <Navigate to="/Kambaz/Account/Signin" />;
  }

  if (!currentUser.role) {
    console.error("🚫 currentUser has no role!");
    return <Navigate to="/Kambaz/Unauthorized" />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    console.warn(`🚫 Access denied for role: ${currentUser.role}`);
    return <Navigate to="/Kambaz/Unauthorized" />;
  }

  return children;
}
