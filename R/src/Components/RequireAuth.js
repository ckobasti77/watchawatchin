import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";

const RequireAuth = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signinup" state={{ from: location }} replace />
  );
};

export default RequireAuth;
