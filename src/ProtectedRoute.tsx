import { Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "./components/layout/layout";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
