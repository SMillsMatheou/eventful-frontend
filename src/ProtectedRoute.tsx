import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const getAccessToken = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/verify",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Not authenticated");
    }

    return true;
  } catch (error) {
    return false;
  }
};

const isAuthenticatedFunc = async () => {
  const isAuth = await getAccessToken();

  return isAuth;
};

const ProtectedRoute = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthed = await isAuthenticatedFunc();
      setIsAuthenticated(isAuthed);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
