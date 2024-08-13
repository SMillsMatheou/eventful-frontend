import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import Layout from "./components/layout/layout";

const getAccessToken = async () => {
  try {
    const response = await axiosInstance.get("/auth/verify");

    if (response.status !== 200) {
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

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
